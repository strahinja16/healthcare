import { Measurement } from '../entity/measurement.entity';
import { CreateMeasurementDto } from '../dto/createMeasurement.dto';
import { HttpException } from '@nestjs/common';

export interface IMeasurementsService {
    findById(id: string): Promise<Measurement>;
    findOne(query: object): Promise<Measurement>;
    create(createMeasurementDto: CreateMeasurementDto): Promise<Measurement | HttpException>;
}
