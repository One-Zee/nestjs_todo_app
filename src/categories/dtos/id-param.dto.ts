import { IsString, Length, IsMongoId } from "class-validator"

export class IdParamDto {
    
    @IsMongoId()
    _id:string

}