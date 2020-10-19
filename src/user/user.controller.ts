import { Body, Controller, Delete, Logger, Post, Put, UseGuards } from '@nestjs/common';
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

        return this.userService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Body() user: UserDTO){

        return this.userService.update(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Body() user: any){

        return this.userService.delete(user);
    }

}
