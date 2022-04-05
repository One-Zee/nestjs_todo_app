import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document ,Schema as MongooseSchema } from 'mongoose';
import { Task } from "src/tasks/schemas/task.schema";
import { User } from "src/users/schemas/user.schema";

export type CategoryDocument = Category & Document ;

@Schema(/*{collection:'users'}*/)
export class Category {
    @Prop()
    title:string

    @Prop({ type: MongooseSchema.Types.ObjectId , ref: User.name })
    authorId: User //MongooseSchema.Types.ObjectId

    @Prop({ type: [{type: MongooseSchema.Types.ObjectId , ref: Task.name }]})
    tasks: Task[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)