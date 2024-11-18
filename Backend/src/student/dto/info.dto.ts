import { IsEmail } from "class-validator";

export class StudentInfoDto {

    @IsEmail()
    email: string;

    avatar_url: string;

    name: string;

    paper_balance: string;
    
    school_year: string;

    mssv: string;

}