import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { StudentService } from './student.service';
import { MessageResponseDto, StudentInfoDto } from './dto';
import { SettingService } from 'src/setting/setting.service';

@Controller('student')
export class StudentController {
    constructor(
        private studentService: StudentService,
        private settingService: SettingService,

    ) { }

    @Get('info')
    async getInfo(
        @Req() req: Express.Request,
    ): Promise<StudentInfoDto> {
        const id = req.user.id;
        const data: StudentInfoDto = await this.studentService.getInfo(id);
        return data
    }

    @Get('pre-payment')
    async getPaperPrice(): Promise<number> {
        return this.settingService.getLatestPaperPrice();
    }

    @Post('buy-paper/:id')
    async buyPaper(@Param('id') id: string, @Body() body: { paper_number: number }) {
        const { paper_number } = body;
        return await this.studentService.buyPaper(id, paper_number);
    }


}
