import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type TaskDocument = Task & Document ;

@Schema(/*{collection:'users'}*/)
export class Task {
    @Prop()
    title: string

    @Prop({
        type: Boolean,
        default: false
    })
    completed: boolean

    @Prop({
        type: Date,
        default: Date.now
    })
    date: Date
}

export const TaskSchema = SchemaFactory.createForClass(Task)