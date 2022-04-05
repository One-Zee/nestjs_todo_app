import { IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Length(5,20)
    username:string

    @IsString()
    @Length(5,50)
    password:string
}