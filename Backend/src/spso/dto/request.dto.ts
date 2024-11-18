import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class SettingRequestDto{

    @IsString()
    @IsNotEmpty()
    paperNumber: string; 
    
    @IsString()
    @IsNotEmpty()
    supplyDate: string; 

    @IsString()
    @IsNotEmpty()
    pagePrice: string; 
    
    @IsArray()
    fileTypes: string[]
}