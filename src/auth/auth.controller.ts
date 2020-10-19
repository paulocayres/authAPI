import { Request, Controller, Post, UseGuards, Body, Logger } from '@nestjs/common';
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

        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    refreshToken(@Body() user){

        return this.authService.refreshToken(user);
    }

 }
