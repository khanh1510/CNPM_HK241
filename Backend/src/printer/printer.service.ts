import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrinterInfoDto, SetPrinterRequestDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrinterService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async getAllPrinter(search: string): Promise<PrinterInfoDto[]> {
        try {
            const searchContext = search === undefined ? '' : search;
            const printer = await this.prismaService.printer.findMany({
                where: {
                    OR: [
                        {
                            id: {
                                contains: searchContext
                            }
                        },
                        {
                            name: {
                                contains: searchContext
                            }
                        },
                        {
                            location: {
                                contains: searchContext
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    location: true,
                    status: true
                }
            })
            const data = printer.map((printer) => ({
                id: printer.id,
                name: printer.name,
                location: printer.location,
                status: printer.status
            }))
            return data
        } catch (error) {
            console.error('Error fetching printers:', error.message);
            throw new Error('Failed to fetch printers');
        }
    }

    async createPrinter(id: string, body: SetPrinterRequestDto): Promise<string> {
        try {

            const [existingSpso, existingPrinter] = await Promise.all([
                this.prismaService.spso.findUnique({ where: { id } }),
                this.prismaService.printer.findUnique({ where: { id: body.id } }),
            ]);
    
            if (!existingSpso) {
                throw new BadRequestException('You do not have permission to add a printer');
            }
    
            if (existingPrinter) {
                throw new BadRequestException('Printer ID already exists');
            }
    
            await this.prismaService.printer.create({
                data: {
                    id: body.id,
                    name: body.name,
                    description: body.description || null,
                    campus: body.campus,
                    location: body.location,
                    status: body.status,
                },
            });
    
            return 'Printer created successfully';
        } catch (error) {
            console.error('Error creating printer:', error.message);
            throw new BadRequestException('Failed to create printer');
        }
    }
    

    async editPrinter(id: string, body: SetPrinterRequestDto): Promise<string> {
        try {
            const [existingSpso, existingPrinter] = await Promise.all([
                this.prismaService.spso.findUnique({ where: { id } }),
                this.prismaService.printer.findUnique({ where: { id: body.id } }),
            ]);
    
            if (!existingSpso) {
                throw new BadRequestException('You do not have permission to edit a printer');
            }
    
            if (!existingPrinter) {
                throw new NotFoundException('Printer not found');
            }
    
            await this.prismaService.printer.update({
                where: { id: body.id },
                data: {
                    name: body.name,
                    description: body.description || null,
                    campus: body.campus,
                    location: body.location,
                    status: body.status,
                    update_at: new Date(),
                },
            });
    
            return 'Printer updated successfully';
        } catch (error) {
            console.error('Error updating printer:', error.message);
            throw new BadRequestException('Failed to update printer');
        }
    }
    
}
