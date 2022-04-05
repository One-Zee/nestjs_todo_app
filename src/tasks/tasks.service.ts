import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos/index.dtos';
import { TasksRepository } from './tasks.repository';
import { AuthService } from 'src/auth/services/auth.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TasksService {

    constructor (
        private taskRepository:TasksRepository,
        private authService:AuthService,
        private categoriesService:CategoriesService
    ) {}


    async create (categoryId:string,accessToken:string,data:CreateTaskDto) {
        const authorId = await this.getTokenId(accessToken);
        const oldCategory = await this.categoriesService.findOne(categoryId,authorId);
        const task = await this.taskRepository.create(data);
        const update = await this.categoriesService.updateCategoryTasks(categoryId,task._id);
        return task
    }

    async getTokenId (accessToken:string):Promise<string> {
        const { _id } = await this.authService.verifyJwt(accessToken);
        return _id
    }

    async deleteOne (_id:string) {
        try {
            const task = await this.taskRepository.deleteOne(_id)
            if(task.acknowledged && task.deletedCount === 1){
                console.log(task);
                return {deleted: true}
            }else{
                return {deleted: false}
            }
            
        } catch (error) {
            throw new NotFoundException('Task not found!') 
        }
    }

    async update (_id:string,data:UpdateTaskDto) {
        const task = await this.taskRepository.updateOne(_id,data)
        if(!task){
            throw new NotFoundException('Task not found!') 
        }
        return task;
    }

}
