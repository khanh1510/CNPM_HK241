import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { GetUser } from "../auth/decorator";
// import { Request } from 'express';
import { MyJwtGuard } from '../auth/guard';
import { user } from '@prisma/client';

@Controller('user')
export class UserController {
//   @UseGuards(AuthGuard('jwt'))
@UseGuards(MyJwtGuard)
  @Get('me')
  me(@GetUser() user: user) {
    return user
  }
}
