import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { parse } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SettingService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async updateSettings(
        spsoId: string,
        paperNumber: string,
        supplyDate: string,
        fileTypes: string[],
    ): Promise<string> {
        try {
            const paper_number = Number(paperNumber);

            if (paper_number < 0) {
                throw new BadRequestException('Số lượng không được âm');
            }
            const formattedSupplyDate = parse(supplyDate, 'yyyy-MM-dd', new Date());
            const today = new Date();
            if (formattedSupplyDate < today) {
                throw new BadRequestException('Ngày cấp phát phải lớn hơn hoặc bằng ngày hiện tại');
            }

            const existingSpso = await this.prismaService.spso.findUnique({
                where: { id: spsoId },
            });
            if (!existingSpso) {
                throw new BadRequestException('Bạn không có quyền tùy chỉnh setting.');
            }

            await this.prismaService.$transaction(async (prisma) => {
                // Tạo bản ghi trong bảng `setting`
                const setting = await prisma.setting.create({
                    data: {
                        spso_id: spsoId,
                        page_number: paper_number,
                        supply_date: formattedSupplyDate,
                    },
                });

                const fileTypesData = fileTypes.map((type) => ({
                    setting_id: setting.id,
                    type,
                }));

                // Thêm bản ghi vào bảng `file_types`
                await prisma.file_types.createMany({ data: fileTypesData });
            });

            return 'Cập nhật thành công';
        } catch (error) {
            console.error('Error updating settings:', error.message);

            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new InternalServerErrorException('Lỗi khi cập nhật thông tin');
        }
    }

    async getLatestFileTypes(): Promise<string[]> {
        try {
            const latestSetting = await this.prismaService.setting.findFirst({
                orderBy: { create_at: 'desc' },
            });

            if (!latestSetting) {
                throw new NotFoundException('Không tìm thấy cấu hình gần nhất');
            }

            const fileTypes = await this.prismaService.file_types.findMany({
                where: { setting_id: latestSetting.id },
                select: { type: true },
            });

            return fileTypes.map((fileType) => fileType.type);
        } catch (error) {
            console.error('Error fetching file types:', error.message);
            throw new BadRequestException('Lỗi khi lấy danh sách định dạng');
        }
    }


}
