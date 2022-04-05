import { IsString, Length, IsMongoId } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @Length(3,20)
    title:string

}