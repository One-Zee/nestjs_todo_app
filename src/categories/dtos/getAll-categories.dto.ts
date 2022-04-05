import { Expose } from "class-transformer"
import { Task } from "src/tasks/schemas/task.schema"
import { TaskDto } from "src/tasks/dtos/task.dto"

export class GetAllCategoriesDto {
    @Expose()
    _id:string

    @Expose()
    title:string

    @Expose()
    authorId:string

    @Expose()
    tasks:TaskDto[]

}