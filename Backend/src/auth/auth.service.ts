import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { AuthDTO, LoginResponseDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { access } from 'fs';

@Injectable({})
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) { }

	// async register(authDTO: AuthDTO) {
	// 	const hashedPassword = await argon2.hash(authDTO.password);
	// 	try {
	// 		const user = await this.prismaService.user.create({
	// 			data: {
	// 				email: authDTO.email,
	// 				password: hashedPassword,
	// 				avatar_url: '',
	// 				role: 'student'
	// 			},
	// 			select: {
	// 				id: true,
	// 				email: true,
	// 			},
	// 		});
	// 		return await this.signJwtString(user.id, user.email);
	// 	} catch (error) {
	// 		if (error.code == 'P2002') {
	// 			//throw new ForbiddenException(error.message)
	// 			throw new ForbiddenException('Error');
	// 		}
	// 	}
	// }

	async login(email: string, password: string, role: string): Promise<LoginResponseDto> {
		const user = await this.userService.findByEmail(email);
		if (!user) {
			throw new ForbiddenException('Email or password is wrong!');
		}
		if (role !== user.role) {
			throw new ForbiddenException('Email or password is wrong!');
		}
		const passwordMatched = await argon2.verify(
			user.password,
			password,
		);
		if (!passwordMatched) {
			throw new ForbiddenException('Email or password is wrong!');
		}
		delete user.password;
		const token = await this.signJwtString(user.id, user.email);
		return {
			id: user.id,
			email: user.email,
			accessToken: token
		}
	}

	async signJwtString(
		id: string,
		email: string,
	): Promise<string> {
		const payload = {
			id,
			email,
		};
		const jwtString = await this.jwtService.signAsync(payload, {
			// expiresIn: '10m',
			expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRED'),
			secret: this.configService.get<string>('JWT_SECRET'),
		});
		return jwtString;
	}
}
