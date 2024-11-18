import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentInfoDto } from './dto';

@Injectable()
export class StudentService {
    constructor(
        private prismaService: PrismaService
    ){}

    async getInfo(id: string): Promise<StudentInfoDto> {
        try {
            const student = await this.prismaService.student.findFirst({
                where: {
                    id,
                },
                select: {
                    name: true,
                    paper_balance: true,
                    school_year: true,
                    mssv: true,
                    user: {
                        select: {
                            email: true,
                            avatar_url: true
                        }
                    }
                }
            });
    
            if (!student) {
                throw new Error(`Student with id ${id} not found`);
            }
    
            return {
                email: student.user.email,
                avatar_url: student.user.avatar_url,
                name: student.name,
                paper_balance: student.paper_balance.toString(),
                school_year: student.school_year,
                mssv: student.mssv,

            };
        } catch (error) {
            console.error('Error fetching student info:', error.message);
            throw new Error('Could not retrieve student information');
        }
    }

    async buyPaper(id: string, paper_numper: number): Promise<string> {
        try {
            const paper_number = Number(paper_numper)
            if (paper_number <= 0) {
                throw new Error('Paper number must be greater than 0');
            }
    
            const student = await this.prismaService.student.update({
                where: {
                    id,
                },
                data: {
                    paper_balance: {
                        increment: paper_number,
                    },
                },
            });
            if (!student) {
                throw new Error(`Student with id ${id} not found`);
            }
    
            return 'success';
        } catch (error) {
            console.error('Error buying paper:', error.message);
            throw new Error('Failed to buy paper');
        }
    }
    
}
