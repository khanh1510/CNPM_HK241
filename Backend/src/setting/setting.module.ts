import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SettingService],
  exports: [SettingService]
})
export class SettingModule {}
