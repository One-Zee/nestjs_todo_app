import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './dtos//index.dtos';


@Injectable()
export class TasksRepository {

    constructor (@InjectModel(Task.name) private taskModel:Model<TaskDocument>) {
        
    }

    deleteOne (_id:string) {
        return this.taskModel.deleteOne({_id})
    }

    updateOne (_id,data:UpdateTaskDto) {
        return this.taskModel.findByIdAndUpdate(_id,data)
        .setOptions({ new: true })
    }

    create (data:CreateTaskDto) {
        return this.taskModel.create({title:data.title})
    }

    /*findOne (_id:string) {
        return this.taskModel.findOne({_id})
    }   */

}
