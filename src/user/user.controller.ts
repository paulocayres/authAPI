import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){
    }

    @Post()
    create(@Body() user: UserDTO){
        return this.userService.create(user);
    }

}
