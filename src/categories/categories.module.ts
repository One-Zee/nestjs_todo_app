import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category , CategorySchema} from './schemas/category.schema';
import { CategoriesRepository } from './categories.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Category.name,schema: CategorySchema}]),
    AuthModule
  ],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports:[CategoriesService]
})
export class CategoriesModule {}
