import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByEmail } from './dto';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async findByEmail(email: string): Promise<FindByEmail> {
        return await this.prismaService.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                password: true,
                role: true
            }
        })
    }
}
