import { Module } from '@nestjs/common';
import { SpsoController } from './spso.controller';
import { SpsoService } from './spso.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SettingModule } from 'src/setting/setting.module';

@Module({
  imports: [PrismaModule, SettingModule],
  controllers: [SpsoController],
  providers: [SpsoService]
})
export class SpsoModule {}
