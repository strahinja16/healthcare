import {Body, Controller, HttpStatus, Param, Post, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {IResetPassword} from "./interfaces/auth-reset-password.interface";
import {ConfigService} from "../config/config.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) {}

    @Post('/login')
    @UsePipes(new ValidationPipe())
    public async login(@Body() loginDto: LoginDto, @Res() res) {
        const data = await this.authService.login(loginDto);
        res.status(HttpStatus.ACCEPTED).json(data);
    }

    @Post('/register')
    @UsePipes(new ValidationPipe())
    public async register(@Body() registerDto: RegisterDto, @Res() res) {
        await this.authService.register(registerDto);
        res.status(HttpStatus.ACCEPTED).json('Welcome.Please check your email to confirm registration.');
    }

    @Post('/forgot-password')
    public async forgotPassword(@Body() body, @Res() res) {
        await this.authService.forgotPassword(body.email);
        res.status(HttpStatus.ACCEPTED).json('Password recovery email successfully sent.');
    }

    @Post('/verify-token')
    public async verifyToken(@Body() body, @Res() res) {
        await this.authService.verifyToken(body.token);
        res.status(HttpStatus.ACCEPTED).json('Token is valid.');
    }

    @Post('/reset-password')
    public async resetPassword(@Body() body: IResetPassword, @Res() res) {
        await this.authService.resetPassword(body);
        res.status(HttpStatus.ACCEPTED).json('Password successfully changed.');
    }

    @Post('/confirm/:token')
    @UsePipes(new ValidationPipe())
    public async confirmToken(@Param() param, @Res() res) {
        await this.authService.confirmToken(param.token);
        res.redirect(this.configService.get('FRONTEND'));
    }
}
