import {
    Controller,
    Response,
    HttpStatus,
    Body,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto} from './dto/createMeasurement.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('measurements')
@Controller('measurements')
export class MeasurementsController {
    constructor(private readonly measurementsService: MeasurementsService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createMeasurement(@Response() res, @Body() createMeasurementDto: CreateMeasurementDto) {
        const measurement = await this.measurementsService.create(createMeasurementDto);
        return res.status(HttpStatus.OK).json(measurement);
    }
}
