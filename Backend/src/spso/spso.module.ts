import { Module } from '@nestjs/common';
import { SpsoController } from './spso.controller';
import { SpsoService } from './spso.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SpsoController],
  providers: [SpsoService]
})
export class SpsoModule {}
