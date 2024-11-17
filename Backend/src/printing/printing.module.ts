import { Module } from '@nestjs/common';
import { PrintingController } from './printing.controller';
import { PrintingService } from './printing.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [PrismaModule,FileModule],
  controllers: [PrintingController],
  providers: [PrintingService]
})
export class PrintingModule {}
