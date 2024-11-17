import { IsEmail } from "class-validator";

export class SpsoInfoDto {

    @IsEmail()
    email: string;

    avatar_url: string;

    name: string;

}