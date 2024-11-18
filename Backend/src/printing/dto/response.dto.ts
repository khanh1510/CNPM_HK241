import { IsArray, IsNumber, IsString } from "class-validator";
import { AllPrintingsInfoDto } from "./all-printing.dto";

export class MessageResponseDto{

    @IsString()
    message: string;
}

export class AllPrintingsResponseDto {
    
    @IsArray()
    data: AllPrintingsInfoDto[];
    
    @IsNumber()
    total: number;

    @IsNumber()
    currentPage: number;

    @IsNumber()
    nextPage: number | null;

    @IsNumber()
    prevPage: number | null;

    @IsNumber()
    lastPage: number;
}