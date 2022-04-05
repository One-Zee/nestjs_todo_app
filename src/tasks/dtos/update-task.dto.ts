import { IsString, Length, IsOptional, IsBoolean } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @Length(3,50)
    @IsOptional()
    title:string

    @IsBoolean()
    @IsOptional()
    completed:boolean

}