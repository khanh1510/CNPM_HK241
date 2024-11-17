import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class GetAllPrinterRequestDto {

    @IsString()
    @IsOptional()
    search: string;

}

export class SetPrinterRequestDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    campus: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['able', 'disable'])
    status: 'able' | 'disable';

}