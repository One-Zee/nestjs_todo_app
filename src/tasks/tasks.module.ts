import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Task.name,schema: TaskSchema}]),
    AuthModule,
    CategoriesModule 
  ],
  providers: [TasksService,TasksRepository],
  controllers: [TasksController]
})
export class TasksModule {}
