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
    ValidationPipe, Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import {IUsersService} from "./interfaces/users-service.interface";

@Controller('users')
export class UsersController {
    private readonly usersService: IUsersService;

    constructor(@Inject('UsersService') usersService: IUsersService) {
        this.usersService = usersService;
    }

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

    @Get('/:id/patients')
    public async getUserPatients(@Response() res, @Param() param) {
        const users = await this.usersService.findAllPatients(param.id);
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id/prescriptions')
    public async getUserPrescriptions(@Response() res, @Param() param) {
        const user = await this.usersService.findOne({ id: param.id, relations: ['prescriptions'] });
        return res.status(HttpStatus.OK).json(user.prescriptions);
    }

    @Get('/:id/measurements')
    public async getUserMeasurements(@Response() res, @Param() param) {
        const user = await this.usersService.findOne({ id: param.id, relations: ['measurements'] });
        return res.status(HttpStatus.OK).json(user.measurements);
    }

    @Get('/:id/examinations')
    public async getUserExaminations(@Response() res, @Param() param) {
        const user = await this.usersService.findOne({ id: param.id, relations: ['examinations'] });
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

    @Put('/:id/doctor')
    public async updateUserDoctor(@Param() param, @Response() res, @Body() body) {
        const user = await this.usersService.updateDoctor(param.id, body.id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:id')
    public async deleteUser(@Param() param, @Response() res) {

        const user = await this.usersService.delete(param.id);
        return res.status(HttpStatus.OK).json(user);
    }
}
