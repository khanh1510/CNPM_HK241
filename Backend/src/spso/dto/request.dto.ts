import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class SettingRequestDto{

    @IsString()
    @IsNotEmpty()
    paperNumber: string; 
    
    @IsString()
    @IsNotEmpty()
    supplyDate: string; 
    
    @IsArray()
    fileTypes: string[]
}