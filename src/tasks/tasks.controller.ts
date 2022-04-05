import { Controller, Delete, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { GetToken } from 'src/auth/decorators/get-current-user-id.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dtos/index.dtos';
import { IdParamDto } from 'src/categories/dtos/id-param.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {

    constructor (private taskService:TasksService) {}

    @Post('/:_id')
    @Serialize(TaskDto)
    create (@Body() body:CreateTaskDto,@Param() param:IdParamDto,@GetToken() accessToken:string) {
        return this.taskService.create(param._id,accessToken,body)
    }

    @Delete('/:_id')
    delete (@Param() param:IdParamDto) {
        return this.taskService.deleteOne(param._id)
    }

    @Put('/:_id')
    @Serialize(TaskDto)
    update (@Body() body:UpdateTaskDto, @Param() param:IdParamDto) {
        return this.taskService.update(param._id,body)
    }

}
