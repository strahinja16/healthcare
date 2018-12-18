import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    public async getUsers(@Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getUser(@Response() res, @Param() param) {
        const user = await this.usersService.findById(param.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Get('/:id/prescriptions')
    public async getUserPrescriptions(@Response() res, @Param() param) {
        const user = await this.usersService.findOne({ id: param.id, relations: ["prescriptions"] });
        return res.status(HttpStatus.OK).json(user.prescriptions);
    }


    @Get('/:id/measurements')
    public async getUserMeasurements(@Response() res, @Param() param) {
        const user = await this.usersService.findOne({ id: param.id, relations: ["measurements"] });
        return res.status(HttpStatus.OK).json(user.measurements);
    }


    @Get('/:id/examinations')
    public async getUserExaminations(@Response() res, @Param() param) {
        const user = await this.usersService.findOne({id: param.id, relations: ["examinations"] });
        return res.status(HttpStatus.OK).json(user.examinations);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createUser(@Response() res, @Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('/:id')
    public async updateUser(@Param() param, @Response() res, @Body() body) {

        const user = await this.usersService.update(param.id, body);
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {

        const user = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(user);
    }
}
