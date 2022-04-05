import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository{

    constructor ( @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    findOne (_id:string) {
        return this.userModel.findById(_id);
    }

    findByUsername (username:string) {
        return this.userModel.findOne({username});
    }

    create (username:string,password:string) {
        return this.userModel.create({username,password})
    }
}