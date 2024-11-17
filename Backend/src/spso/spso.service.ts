import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpsoInfoDto } from './dto';

@Injectable()
export class SpsoService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async getInfo(id: string): Promise<SpsoInfoDto> {
        try {
            const spso = await this.prismaService.spso.findFirst({
                where: {
                    id,
                },
                select: {
                    name: true,
                    user: {
                        select: {
                            email: true,
                            avatar_url: true
                        }
                    }
                }
            });

            if (!spso) {
                throw new Error(`SPSo with id ${id} not found`);
            }

            return {
                email: spso.user.email,
                avatar_url: spso.user.avatar_url,
                name: spso.name,
            };
        } catch (error) {
            console.error('Error fetching SPSo info:', error.message);
            throw new Error('Could not retrieve SPSo information');
        }
    }
}

