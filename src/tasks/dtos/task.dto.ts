import { Expose } from "class-transformer"

export class TaskDto {
    @Expose()
    _id:string

    @Expose()
    title:string

    @Expose()
    completed:boolean

    @Expose()
    date:Date
}