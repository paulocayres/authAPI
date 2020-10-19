import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserDTO } from './user.dto';
import * as Bcrypt from 'bcrypt'

const saltRounds = 10;

@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
    }

    

    async create(user: UserDTO){

        const encryptedPassword = await Bcrypt.hash(user.password, saltRounds);
        user.password = encryptedPassword;
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async findOne(user: UserDTO) {

        return await this.userModel.findOne({username: user.username}).exec();
    }

    async delete(user: UserDTO) {
        
        return await this.userModel.deleteOne(user).exec();
    }
    async update(user) {

        const doc =  await this.userModel.findById(user._id).exec();
        Logger.log('User: ', JSON.stringify(user));
        Logger.log('Doc: ', JSON.stringify(doc));
        doc.password = await Bcrypt.hash(user.password, saltRounds);
        return await doc.save();
    }

}
