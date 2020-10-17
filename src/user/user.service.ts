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

    async login(user: UserDTO){
        const findedUser =  await this.userModel.findOne({email: user.email}).exec();
        Logger.log(user);
        Logger.log(findedUser);
        if (findedUser && findedUser.password == user.password){
            return {message: 'login realizado com sucesso'};
        } else {
            return {message: 'falha no login'};
        }

    }

}
