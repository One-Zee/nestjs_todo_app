import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schemas/category.schema";
import { Model } from 'mongoose';

@Injectable()
export class CategoriesRepository{

    constructor ( @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>) {}

    findOne (_id:string,authorId:string) {
        return this.CategoryModel.findOne({_id,authorId}).populate('tasks');
    }

    existTitle (title:string, authorId:string) {
        return this.CategoryModel.findOne({title,authorId});
    }

    findAll (authorId:string) {
        return this.CategoryModel.find({authorId}).populate('tasks');
    }

    create (title:string,authorId:string) {
        return this.CategoryModel.create({title,authorId})
    }

    update (_id:string,title:string) {
        return this.CategoryModel.findByIdAndUpdate(_id,{title})
        .setOptions({ new: true })
    }

    deleteOne (_id:string) {
        return this.CategoryModel.deleteOne({_id})
    }

    updateCategoryTasks (categoryId:string,taskId:string) {
        return this.CategoryModel.updateOne(
            {_id:categoryId},
            { $push: { tasks: taskId } },
            { new: true, useFindAndModify: false }
        )
    }
}