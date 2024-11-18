import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { GetAllPrinterRequestDto, MessageResponseDto, PrinterInfoDto, PrinterInfoResponseDto, SetPrinterRequestDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { user } from '@prisma/client';

@Controller('printer')
export class PrinterController {
    constructor(
        private printerService: PrinterService
    ) { }

    @Get('all-printer')
    async getAllPrinter(
        @Query() query: GetAllPrinterRequestDto
    ): Promise<PrinterInfoResponseDto> {
        const { search } = query
        const data: PrinterInfoDto[] = await this.printerService.getAllPrinter(search);
        return { data }
    }

    @Post('create-printer')
    async createPrinter(@GetUser() user: user, @Body() body: SetPrinterRequestDto): Promise<MessageResponseDto> {
        const {id} = user
        const message: string = await this.printerService.createPrinter(id, body);
        return {message}
    }

    @Put('edit-printer')
    async editPrinter(@GetUser() user: user, @Body() body: SetPrinterRequestDto): Promise<MessageResponseDto> {
        const {id} = user
        const message: string = await this.printerService.editPrinter(id, body);
        return {message}
    }
}
