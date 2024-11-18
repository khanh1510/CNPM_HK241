import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Đảm bảo bạn có service Prisma
import { BadRequestException } from '@nestjs/common';
import { AllPrintingsResponseDto, GetAllPrintingsRequestDto, NamePathSizeDto, PrintingRequestDto } from './dto';

@Injectable()
export class PrintingService {
  constructor(private prismaService: PrismaService) { }

  async createPrinting(
    student_id: string,
    body: PrintingRequestDto,
    namePathSize: NamePathSizeDto[],
  ): Promise<string> {
    if (body.files.length !== namePathSize.length) {
      throw new BadRequestException(
        'Mismatch between number of files and file data provided.',
      );
    }

    return this.prismaService.$transaction(async (prisma) => {
      const printing = await prisma.printing.create({
        data: {
          student_id,
          printer_id: body.printer_id,
          status: 'waiting',
          create_at: new Date(),
          update_at: new Date(),
        },
        select: { id: true },
      });

      let totalDebit = 0;
      const fileDataList = body.files.map((file, index) => {
        const coefficient = file.page_type === 'A2' ? 4 : file.page_type === 'A3' ? 2 : 1;
        const pageCount =
          Number(file.copies_number) *
          coefficient *
          (Number(file.print_to_page) - Number(file.print_from_page));
        totalDebit += pageCount;

        return {
          printing_id: printing.id,
          name: namePathSize[index].name,
          file_url: namePathSize[index].path,
          file_size: Number(namePathSize[index].size),
          page_number: Number(file.page_number),
          copies_number: Number(file.copies_number),
          page_type: file.page_type || 'A4',
          print_from_page: Number(file.print_from_page) || 1,
          print_to_page: Number(file.print_to_page),
          print_horizontal: file.print_horizontal === 'true',
          left: Number(file.left) || 0,
          right: Number(file.right) || 0,
          top: Number(file.top) || 0,
          bottom: Number(file.bottom) || 0,
          single_sided: file.single_sided === 'true',
        };
      });

      const student = await prisma.student.findUniqueOrThrow({
        where: { id: student_id },
        select: { paper_balance: true },
      });
      if (student.paper_balance < totalDebit) {
        throw new BadRequestException('Balance is not enough.');
      }
      await prisma.file.createMany({
        data: fileDataList,
      });
      await prisma.student.update({
        where: { id: student_id },
        data: {
          paper_balance: {
            decrement: totalDebit,
          },
        },
      });

      return 'Printing job created successfully';
    });
  }


  async getAllPrintings(id: string, query: GetAllPrintingsRequestDto): Promise<AllPrintingsResponseDto> {
    const search = query.search || '';
    const startDate = query.start_date ? new Date(query.start_date) : undefined;
    const endDate = query.end_date ? new Date(query.end_date) : undefined;
    const page = parseInt(query.page, 10) || 1;
    const itemsPerPage = parseInt(query.items_per_page, 10) || 10;

    const whereClause: any = {};

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { spso: true, student: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.spso) {
      if (startDate && endDate) {
        whereClause.create_at = { gte: startDate, lte: endDate };
      }
      if (search) {
        whereClause.OR = [
          { id: { contains: search } },
          { student: { mssv: { contains: search } } },
          { printer_id: { contains: search } },
          { file: { some: { name: { contains: search } } } },
        ];
      }
    } else if (user.student) {
      whereClause.student_id = user.student.id;

      if (startDate && endDate) {
        whereClause.create_at = { gte: startDate, lte: endDate };
      }
      if (search) {
        whereClause.OR = [
          { id: { contains: search } },
          { printer_id: { contains: search } },
          { file: { some: { name: { contains: search } } } },
        ];
      }
    } else {
      throw new BadRequestException('Invalid user role');
    }

    try {

      const [total, printings] = await Promise.all([
        this.prismaService.printing.count({ where: whereClause }),
        this.prismaService.printing.findMany({
          where: whereClause,
          include: {
            student: true,
            printer: true,
            spso: true,
            file: true,
          },
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage,
          orderBy: { create_at: 'desc' },
        }),
      ]);

      const data = printings.map((printing) => ({
        id: printing.id,
        mssv: printing.student?.mssv || null,
        printer_id: printing.printer_id,
        create_at: printing.create_at,
        file_name: printing.file.map((f) => f.name),
        total_paper: printing.file.reduce((total, f) => total + (f.print_to_page - f.print_from_page) * f.copies_number, 0),
        status: printing.status,
      }));

      const lastPage = Math.ceil(total / itemsPerPage);
      const nextPage = page < lastPage ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      return {
        data,
        total,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error fetching printings');
    }
  }

  async updatePrintingStatus(
    id: string,
    printing_id: string,
    status: string,
  ): Promise<string> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: { spso: true },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.spso) {
        const updatedPrinting = await this.prismaService.printing.update({
          where: { id: printing_id },
          data: {
            status,
            spso_id: user.spso.id,
            update_at: new Date(),
          },
        });
        return `Printing status updated successfully by SPSo. New status: ${updatedPrinting.status}`;
      }

      const updatedPrinting = await this.prismaService.printing.update({
        where: { id: printing_id },
        data: {
          status,
          update_at: new Date(),
        },
      });

      return `Printing status updated successfully. New status: ${updatedPrinting.status}`;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error updating printing status');
    }
  }
}
