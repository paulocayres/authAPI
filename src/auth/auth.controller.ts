import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Controller('login')
export class AuthController {

    constructor(private userService: UserService){
    }

    @Post()
    login(@Body() user: UserDTO){
        return this.userService.login(user);
    }

 }
