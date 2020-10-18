import { Injectable, Logger } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(private userService: UserService,
        private jwtService: JwtService) {
    }

    async validateUser(user: UserDTO) {

        const findedUser = await this.userService.findOne(user);
        //Logger.log(user);
        //Logger.log(findedUser);
        if (findedUser && findedUser.password === user.password) {
            const { password, ...result } = findedUser;
            return result;
        } else {
            return null;
        }

    }

/*     async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const access_token = this.jwtService.sign(payload)
        return {
            access_token: access_token
        };
    } */

    async login(user: any) {
        const payload = {username: user.userName, sub: user};
        const refresh_token = await this.jwtService.sign(payload,{expiresIn: '10d'});
        const access_token = await this.jwtService.sign(payload);

        Logger.log('user: ', JSON.stringify(user));
        Logger.log('refresh: ',JSON.stringify(refresh_token));
        Logger.log('access: ',JSON.stringify(access_token));
        return {
            refresh_token: refresh_token,
            access_token: access_token
        };
    }

    async refreshToken(user) {
        const decodedToken = await this.jwtService.decode(user.token);
        const JSONToken = JSON.parse(JSON.stringify(decodedToken));
        const accessPayload = {username: JSONToken.userName, sub: JSONToken};
        const access_token = await this.jwtService.sign(accessPayload);
        Logger.log('decodedToken: ', JSON.stringify(JSONToken));
        Logger.log('user: ', JSON.stringify(user));
        Logger.log('access: ',JSON.stringify(access_token));
        return {
            access_token: access_token
        };
    }

}
