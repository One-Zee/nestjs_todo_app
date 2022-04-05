import { Injectable , BadRequestException, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {

    constructor (private categoriesRepository:CategoriesRepository) {

    }

    findAll (authorId:string) {
        return this.categoriesRepository.findAll(authorId);
    }

    async findOne (_id:string,authorId:string) {
        try {
            const category = await this.categoriesRepository.findOne(_id,authorId);
            if(!category){
                throw new BadRequestException('Category not found!')
            }
            return category;
            
        } catch (error) {
            throw new BadRequestException('Category not found!')
        }
    }

    async create (title:string,authorId:string) {
        const exist = await this.categoriesRepository.existTitle(title, authorId);
        if(exist){
            throw new BadRequestException('Category exists!')
        }
        return this.categoriesRepository.create(title,authorId)
    }

    async update (_id:string,title:string) {
        const category = await this.categoriesRepository.update(_id,title)
        if(!category){
            throw new NotFoundException('Category not found!') 
        }
        return category;
    }

    async deleteOne (_id:string) {
        try {
            const category = await this.categoriesRepository.deleteOne(_id)
            if(category.acknowledged && category.deletedCount === 1){
                console.log(category);
                return {deleted: true}
            }else{
                return {deleted: false}
            }
            
        } catch (error) {
            throw new NotFoundException('Category not found!') 
        }
        
    }

    updateCategoryTasks (categoryId:string,taskId:string) {
        return this.categoriesRepository.updateCategoryTasks(categoryId,taskId);
    }


}
