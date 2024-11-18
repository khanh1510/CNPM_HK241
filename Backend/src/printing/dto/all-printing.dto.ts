import { IsOptional } from "class-validator";

export class AllPrintingsInfoDto {

    id: string;

    @IsOptional()
    mssv: string;

    printer_id: string;

    create_at: Date;

    file_name: string[];

    total_paper: number;

    status: string;
}