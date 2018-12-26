import {
    Controller,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    UsePipes,
    ValidationPipe, Inject,
} from '@nestjs/common';
import { CreateExaminationDto} from './dto/createExamination.dto';
import { ApiUseTags } from '@nestjs/swagger';
import {IExaminationsService} from "./interfaces/examinations-service.interface";

@ApiUseTags('examinations')
@Controller('examinations')
export class ExaminationsController {
    private readonly examinationsService: IExaminationsService;

    constructor(@Inject('IExaminationsService') examinationsService: IExaminationsService) {
        this.examinationsService = examinationsService;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createExamination(@Response() res, @Body() createExaminationDto: CreateExaminationDto) {
        const examination = await this.examinationsService.create(createExaminationDto);
        return res.status(HttpStatus.OK).json(examination);
    }

    @Put('/:id')
    public async updateExamination(@Param() param, @Response() res, @Body() body) {
        const examination = await this.examinationsService.update(param.id, body);
        return res.status(HttpStatus.OK).json(examination);
    }

}
