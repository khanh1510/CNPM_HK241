import { BadRequestException, Body, Controller, Get, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PrintingService } from './printing.service';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { user } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { GetAllPrintingsRequestDto, MessageResponseDto, NamePathSizeDto, PrintingRequestDto, UpdateStatusDto } from './dto';
import { promises as fs } from 'fs';
import { SettingService } from 'src/setting/setting.service';

@Controller('printing')
export class PrintingController {
    constructor(
        private printingService: PrintingService,
        private settingService: SettingService,

    ) { }

    @Get('pre-printing')
    async getPrePrinting(): Promise<string[]> {
        return await this.settingService.getLatestFileTypes();
    }

    @Post('print')
    @UseInterceptors(AnyFilesInterceptor({
        storage: storageConfig('file_url'),
        fileFilter: (body, file, cb) => {
            const ext = extname(file.originalname);
            const allowedExtArr = ['.pdf', '.doc', '.docx', '.pptx', '.xml', '.png', '.jpeg', '.jpg'];
            if (!allowedExtArr.includes(ext)) {
                body.fileValidationError = `Wrong extension type. Accepted file extensions are: ${allowedExtArr.toString()}`;
                cb(null, false);
            } else {
                const fileSize = parseInt(body.headers['content-length']);
                if (fileSize > 1024 * 1024 * 50) {
                    body.fileValidationError = 'File size is too large. Accepted file size is less than 50MB';
                    cb(null, false);
                } else {
                    cb(null, true);
                }
            }
        },
    }))
    async createPrinting(
        @GetUser() user: user,
        @Body() body: PrintingRequestDto,
        @UploadedFiles() files: Array<Express.Multer.File>
    ): Promise<MessageResponseDto> {
        const fileStorage = 'file_url';

        if (body.fileValidationError) {
            throw new BadRequestException(body.fileValidationError);
        }

        if (!files || files.length === 0) {
            throw new BadRequestException('At least one file is required!');
        }

        console.log(files);
        const student_id: string = user.id;

        const filesNameAndPath: NamePathSizeDto[] = files.map((file) => ({
            name: file.originalname,
            path: fileStorage + '/' + file.filename,
            size: file.size.toString(),
        }));

        try {
            const message: string = await this.printingService.createPrinting(student_id, body, filesNameAndPath);

            return { message };
        } catch (error) {
            console.error('Error creating printing job:', error);
            await this.deleteUploadedFiles(filesNameAndPath.map(file => 'data/' + file.path));

            throw new BadRequestException('Failed to create printing job. All uploaded files have been removed.');
        }
    }

    /**
     * Hàm xóa file đã upload
     * @param filePaths - Mảng đường dẫn các file cần xóa
     */
    private async deleteUploadedFiles(filePaths: string[]): Promise<void> {
        console.log(filePaths)
        for (const path of filePaths) {
            try {
                await fs.unlink(path);
                console.log(`Deleted file: ${path}`);
            } catch (error) {
                console.error(`Failed to delete file: ${path}`, error);
            }
        }
    }


    @Get('all-printings')
    async getPrintings(@GetUser() user: user, @Query() query: GetAllPrintingsRequestDto) {
        const printings = await this.printingService.getAllPrintings(user.id, query);
        return printings;
    }

    @Put('printing-status')
    async updatePrintingStatus(@GetUser() user: user, @Body() body: UpdateStatusDto): Promise<MessageResponseDto> {
        const message = await this.printingService.updatePrintingStatus(user.id, body.printing_id, body.status);
        return { message };
    }

}


