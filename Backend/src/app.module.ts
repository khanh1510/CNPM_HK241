import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { SpsoModule } from './spso/spso.module';
import { PrintingModule } from './printing/printing.module';
import { PrinterModule } from './printer/printer.module';
import { FileModule } from './file/file.module';
import { APP_GUARD } from '@nestjs/core';
import { MyJwtGuard } from './auth/guard';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentModule,
    SpsoModule,
    PrintingModule,
    PrinterModule,
    FileModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: MyJwtGuard,
    },
  ],
})
export class AppModule {}
