import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SettingModule } from 'src/setting/setting.module';

@Module({
    imports: [PrismaModule, SettingModule],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule { }
