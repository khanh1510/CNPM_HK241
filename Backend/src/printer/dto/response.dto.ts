import { IsArray, IsString } from "class-validator";
import { PrinterInfoDto } from "./info.dto";

export class PrinterInfoResponseDto{

    @IsArray()
    data: PrinterInfoDto[]; 

}

export class MessageResponseDto{

    @IsString()
    message: string;
}