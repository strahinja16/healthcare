import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    public async login(@Body() loginDto: LoginDto, @Res() res) {
        const data = await this.authService.login(loginDto);
        res.status(HttpStatus.ACCEPTED).json(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    public async register(@Body() registerDto: RegisterDto, @Res() res) {
        const data = await this.authService.register(registerDto);
        res.status(HttpStatus.ACCEPTED).json(data);
    }
}
