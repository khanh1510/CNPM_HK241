import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Đảm bảo bạn có service Prisma
import { BadRequestException } from '@nestjs/common';
import { NamePathSizeDto, PrintingRequestDto } from './dto';

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


  // async getAllPrintings(query: any) {
  //     const { student_id, printer_id, spso_id, start_date, end_date, printing_id } = query;

  //     const whereClause: any = {};

  //     if (student_id) whereClause.student_id = student_id;
  //     if (printer_id) whereClause.printer_id = printer_id;
  //     if (spso_id) whereClause.spso_id = spso_id;
  //     if (printing_id) whereClause.id = printing_id;

  //     if (start_date && end_date) {
  //         whereClause.create_at = {
  //             gte: new Date(start_date),
  //             lte: new Date(end_date),
  //         };
  //     }

  //     try {
  //         const printings = await this.prisma.printing.findMany({
  //             where: whereClause,
  //             include: {
  //                 student: true,
  //                 printer: true,
  //                 spso: true,
  //                 file: true,
  //             },
  //         });

  //         return printings;
  //     } catch (error) {
  //         throw new BadRequestException('Error fetching printings');
  //     }
  // }

  // async updatePrintingStatus(printing_id: string, status: string) {
  //     try {
  //         const updatedPrinting = await this.prisma.printing.update({
  //             where: { id: printing_id },
  //             data: {
  //                 status,
  //                 update_at: new Date(),
  //             },
  //         });
  //         return updatedPrinting;
  //     } catch (error) {
  //         throw new BadRequestException('Error updating printing status');
  //     }
  // }

}
