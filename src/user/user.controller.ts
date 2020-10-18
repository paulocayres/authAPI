import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() user: UserDTO){
        //Logger.log('entrou');
        return this.userService.create(user);
    }

}
