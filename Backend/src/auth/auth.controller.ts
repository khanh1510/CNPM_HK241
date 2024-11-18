import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginResponseDto } from './dto';
import { Public } from './decorator';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @Post('register')
  // @Public()
  // register(@Body() body: AuthDTO) {
  //   // console.log(body);
  //   return this.authService.register(body);
  // }


  @Post('login')
  @Public()
  login(@Body() body: AuthDTO): Promise<LoginResponseDto> {
    const {email, password, role} = body
    return this.authService.login(email, password, role);
  }
}
