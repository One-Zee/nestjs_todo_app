import { IsString, Length, IsMongoId } from "class-validator"

export class IdParamDto {
    @IsString()
    @Length(24,24)
    _id:string

}