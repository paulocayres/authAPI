import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { UserDTO } from './user.dto';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){
        
    }

    async create(user: UserDTO){

        const createdUser = new this.userModel(user);
        return await createdUser.save();

    }

    async findOne(user: UserDTO) {

        //Logger.log(user);
        return await this.userModel.findOne({username: user.username}).exec();
    }

}
