import { Request, Controller, Post, UseGuards, Body, Logger } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
AuthService

@Controller('login')
export class AuthController {

    constructor(private authService: AuthService){
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req){
        //Logger.log("controllerUser: ", JSON.stringify(req.user));
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    refreshToken(@Body() user){
        Logger.log('controllerPayload: ', JSON.stringify(user));
        return this.authService.refreshToken(user);
    }

 }
