import { Expose } from "class-transformer"

export class SignInDto {
    @Expose()
    accessToken:string

    @Expose()
    auth:boolean
}