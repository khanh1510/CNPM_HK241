import { Module } from '@nestjs/common';
import { PrintingController } from './printing.controller';
import { PrintingService } from './printing.service';

@Module({
  controllers: [PrintingController],
  providers: [PrintingService]
})
export class PrintingModule {}
