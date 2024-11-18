import { Module } from '@nestjs/common';
import { PrintingController } from './printing.controller';
import { PrintingService } from './printing.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';
import { SettingModule } from 'src/setting/setting.module';

@Module({
  imports: [PrismaModule,FileModule, SettingModule],
  controllers: [PrintingController],
  providers: [PrintingService]
})
export class PrintingModule {}
