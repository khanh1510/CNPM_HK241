import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class FilePrintingRequestDto{
    
    @IsString()
    @IsNotEmpty()
    page_number: string;

    @IsString()
    @IsNotEmpty()
    copies_number: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['A2', 'A3', 'A4'])
    page_type: 'A2'|'A3'|'A4';

    @IsString()
    @IsNotEmpty()
    print_from_page: string;

    @IsString()
    @IsNotEmpty()
    print_to_page: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['true', 'false'])
    print_horizontal: 'true' | 'false';

    @IsString()
    @IsNotEmpty()
    left: string;

    @IsString()
    @IsNotEmpty()
    right: string;

    @IsString()
    @IsNotEmpty()
    top: string;

    @IsString()
    @IsNotEmpty()
    bottom: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['true', 'false'])
    single_sided: 'true' | 'false';
}

export class PrintingRequestDto {

    @IsString()
    @IsNotEmpty()
    printer_id: string;

    @IsArray()
    files: FilePrintingRequestDto[];

    @IsString()
    @IsOptional()
    fileValidationError: string;
}

export class GetAllPrintingsRequestDto {

    @IsOptional()
    search: string;

    @IsOptional()
    start_date: string
    
    @IsOptional()
    end_date: string;

    @IsString()
    @IsNotEmpty()
    page: string;

    @IsString()
    @IsNotEmpty()
    items_per_page: string;
}

export class UpdateStatusDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    printing_id: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['waiting', 'printing', 'printed', 'received', 'cancel'])
    status: 'waiting'|'printing'|'printed'|'received'|'cancel';
}