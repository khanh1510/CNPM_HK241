import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SpsoService } from './spso.service';
import { MessageResponseDto, SpsoInfoDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { user } from '@prisma/client';
import { SettingService } from 'src/setting/setting.service';
import { SettingRequestDto } from './dto/request.dto';

@Controller('spso')
export class SpsoController {
    constructor(
        private studentService: SpsoService,
        private settingService: SettingService
    ) { }

    @Get('info')
    async getInfo(
        @GetUser() user: user,
    ): Promise<SpsoInfoDto> {
        const id: string = user.id;
        const data: SpsoInfoDto = await this.studentService.getInfo(id);
        return data
    }

    @Post('update-settings')
    async updateSettings(
        @GetUser() user: user,
        @Body() body: SettingRequestDto,
    ): Promise<MessageResponseDto> {
        const message = await this.settingService.updateSettings(
            user.id,
            body.paperNumber,
            body.supplyDate,
            body.fileTypes,
        );
        return { message };
    }

    @Get('latest-file-types')
    async getLatestFileTypes(): Promise<string[]> {
        return await this.settingService.getLatestFileTypes();
    }
}
