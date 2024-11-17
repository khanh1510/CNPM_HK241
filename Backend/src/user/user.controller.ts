import { Controller, Get} from '@nestjs/common';
import { GetUser} from "../auth/decorator";
import { user } from '@prisma/client';

@Controller('user')
export class UserController {

  @Get('me')
  me(@GetUser() user: user) {
    return user
  }
}
