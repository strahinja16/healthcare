import {
    Controller,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ExaminationsService } from './examinations.service';
import { CreateExaminationDto} from './dto/createExamination.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('examinations')
@Controller('examinations')
export class ExaminationsController {
    constructor(private readonly examinationsService: ExaminationsService) { }

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
