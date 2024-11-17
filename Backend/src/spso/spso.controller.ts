import { Controller, Get, Req } from '@nestjs/common';
import { SpsoService } from './spso.service';
import { SpsoInfoDto } from './dto';

@Controller('spso')
export class SpsoController {
    constructor(
        private studentService: SpsoService
    ) { }

    @Get('info')
    async getInfo(
        @Req() req: Express.Request,
    ): Promise<SpsoInfoDto> {
        const id = req.user.id;
        const data: SpsoInfoDto = await this.studentService.getInfo(id);
        return data
    }
}
