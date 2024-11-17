import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser, Public } from "../auth/decorator";
import { user } from '@prisma/client';

@Controller('user')
export class UserController {

  @Get('me')
  @Public()
  me(@GetUser() user: user) {
    return user
  }
}
