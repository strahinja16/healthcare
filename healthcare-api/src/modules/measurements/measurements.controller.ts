import {
    Controller,
    Response,
    HttpStatus,
    Body,
    Post,
    UsePipes,
    ValidationPipe, Inject,
} from '@nestjs/common';
import { CreateMeasurementDto} from './dto/createMeasurement.dto';
import { ApiUseTags } from '@nestjs/swagger';
import {IMeasurementsService} from "./interfaces/measurements-service.interface";

@ApiUseTags('measurements')
@Controller('measurements')
export class MeasurementsController {
    private readonly measurementsService: IMeasurementsService;

    constructor(@Inject('IMeasurementsService') measurementsService: IMeasurementsService) {
        this.measurementsService = measurementsService;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    public async createMeasurement(@Response() res, @Body() createMeasurementDto: CreateMeasurementDto) {
        const measurement = await this.measurementsService.create(createMeasurementDto);
        return res.status(HttpStatus.OK).json(measurement);
    }
}
