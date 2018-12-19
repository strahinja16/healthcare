
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateMeasurementDto } from './dto/createMeasurement.dto';
import { Measurement } from './entity/measurement.entity';
import { User } from '../users/entity/user.entity';
import { IMeasurementsService } from './interfaces/measurements-service.interface';

@Injectable()
export class MeasurementsService implements IMeasurementsService {
    constructor(
        @InjectRepository(Measurement)
        private readonly measurementsRepository: Repository<Measurement>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findById(id: string): Promise<Measurement> {
        return await this.measurementsRepository.findOne(id);
    }

    async findOne(query: object): Promise<Measurement> {
        return await this.measurementsRepository.findOne(query);
    }

    async create(createMeasurementDto: CreateMeasurementDto): Promise<Measurement | HttpException> {

        const { userId, ... measurementDto} = createMeasurementDto;

        const user: User = await this.usersRepository.findOne(userId);
        if (!user) {
            return new HttpException('User not found.', HttpStatus.BAD_REQUEST);
        }

        const measurement: Partial<Measurement> = {
            ... measurementDto,
            user: null,
            temperature: measurementDto.temperature ? parseFloat(measurementDto.temperature) : null,
            sugar: measurementDto.sugar ? parseFloat(measurementDto.sugar) : null,
            pulse: measurementDto.pulse ? parseInt(measurementDto.pulse, 10) : null,
        };

        if (measurement.pulse === null && measurement.temperature === null && measurement.sugar === null ) {
            return new HttpException('Please input at least one measurement.', HttpStatus.BAD_REQUEST);
        }

        measurement.user = user;

        return await this.measurementsRepository.save(measurement as Measurement);
    }
}
