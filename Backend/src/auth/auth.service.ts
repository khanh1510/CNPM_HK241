import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async register(authDTO: AuthDTO) {
    const hashedPassword = await argon2.hash(authDTO.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          password: hashedPassword,
          avatar_url: '',
          role: 'student'
        },
        select: {
          id: true,
          email: true,
        },
      });
      return await this.signJwtString(user.id, user.email);
    } catch (error) {
      if (error.code == 'P2002') {
        //throw new ForbiddenException(error.message)
        throw new ForbiddenException('Error');
      }
    }
  }

  async login(authDTO: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email or password is wrong!');
    }
    const passwordMatched = await argon2.verify(
      user.password,
      authDTO.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Email or password is wrong!');
    }
    delete user.password;
    return await this.signJwtString(user.id, user.email);
  }

  async signJwtString(
    id: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: id,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      // expiresIn: '10m',
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRED'),
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
