import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CategoriesModule, TasksModule ,MongooseModule.forRoot('mongodb://localhost/todo_db'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
