import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FindByEmail {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

}