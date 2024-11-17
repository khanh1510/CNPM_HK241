import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Public } from './decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @Public()
  register(@Body() body: AuthDTO) {
    // console.log(body);
    return this.authService.register(body);
  }


  @Post('login')
  @Public()
  login(@Body() body: AuthDTO) {
    return this.authService.login(body);
  }
}
