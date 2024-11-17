import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Đảm bảo bạn có service Prisma
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class PrintingService {
    constructor(private prisma: PrismaService) {}

    async createPrinting(body: any, filePath: string[]) {
        const { student_id, printer_id, spso_id, file_url, file_size, page_number, copies_number } = body;
        
        const fileData = {
            name: body.file_name, 
            file_url: filePath[0],
            file_size: file_size,
            page_number: page_number,
            copies_number: copies_number,
            page_type: body.page_type || 'A4', 
            print_from_page: body.print_from_page || 1,
            print_to_page: body.print_to_page,
            print_horizontal: body.print_horizontal || false,
            left: body.left || 0,
            right: body.right || 0,
            top: body.top || 0,
            bottom: body.bottom || 0,
            single_sided: body.single_sided || true,
        };

        try {
            const printingTransaction = await this.prisma.$transaction(async (prisma) => {

                const printing = await prisma.printing.create({
                    data: {
                        student_id,
                        printer_id,
                        spso_id,
                        status: 'waiting', 
                        create_at: new Date(),
                        update_at: new Date(),
                    },
                });

                // Lưu file
                const file = await prisma.file.create({
                    data: {
                        printing_id: printing.id,
                        ...fileData,
                    },
                });

                return { printing, file };
            });

            return printingTransaction;
        } catch (error) {
            throw new BadRequestException('Error creating printing and file');
        }
    }

    async getAllPrintings(query: any) {
        const { student_id, printer_id, spso_id, start_date, end_date, printing_id } = query;
        
        const whereClause: any = {};
    
        if (student_id) whereClause.student_id = student_id;
        if (printer_id) whereClause.printer_id = printer_id;
        if (spso_id) whereClause.spso_id = spso_id;
        if (printing_id) whereClause.id = printing_id;
        
        if (start_date && end_date) {
            whereClause.create_at = {
                gte: new Date(start_date),
                lte: new Date(end_date),
            };
        }
    
        try {
            const printings = await this.prisma.printing.findMany({
                where: whereClause,
                include: {
                    student: true,
                    printer: true,
                    spso: true,
                    file: true,
                },
            });
    
            return printings;
        } catch (error) {
            throw new BadRequestException('Error fetching printings');
        }
    }
    
    async updatePrintingStatus(printing_id: string, status: string) {
        try {
            const updatedPrinting = await this.prisma.printing.update({
                where: { id: printing_id },
                data: {
                    status,
                    update_at: new Date(),
                },
            });
            return updatedPrinting;
        } catch (error) {
            throw new BadRequestException('Error updating printing status');
        }
    }
    
}
