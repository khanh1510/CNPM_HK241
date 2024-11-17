import { BadRequestException, Body, Controller, Get, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PrintingService } from './printing.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';

@Controller('printing')
export class PrintingController {
    constructor(
        private printingService: PrintingService,
    ) { }

    @Post('printing')
    @UseInterceptors(FileInterceptor('files', {
        storage: storageConfig('file_url'),
        fileFilter: (body, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.pdf', '.doc', '.docx', '.pptx'];
            if (!allowedExtArr.includes(ext)) {
                body.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(body.headers['content-length']);
                if (fileSize > 1024 * 1024 * 50) {
                    body.fileValidationError = 'File size is too large. Accepted file size is les than 50MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        }
    }))
    async createPrinting(@Body() body: any, @UploadedFile() files: Express.Multer.File[]) {
        if (body.fileValidationError) {
            throw new BadRequestException(body.fileValidationError);
        }
        if (!files || files.length === 0) {
            throw new BadRequestException('At least one file is required!');
        }

        const filePaths = files.map(file => file.fieldname + '/' + file.filename);
        await this.printingService.createPrinting(body, filePaths); // Gửi mảng filePaths để lưu vào DB
        return { message: 'success' };
    }

    @Get('printings')
    async getPrintings(@Query() query: any) {
        const printings = await this.printingService.getAllPrintings(query);
        return printings;
    }

    @Put('printing-status')
    async updatePrintingStatus(@Body() body: { printing_id: string, status: string }) {
        const { printing_id, status } = body;
        const updatedPrinting = await this.printingService.updatePrintingStatus(printing_id, status);
        return updatedPrinting;
    }

}
