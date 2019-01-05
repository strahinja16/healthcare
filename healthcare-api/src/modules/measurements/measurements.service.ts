
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateMeasurementDto } from './dto/createMeasurement.dto';
import { Measurement } from './entity/measurement.entity';
import { User } from '../users/entity/user.entity';
import { IMeasurementsService } from './interfaces/measurements-service.interface';
import {IPusherService} from "../pusher/interfaces/pusher-service.interface";

@Injectable()
export class MeasurementsService implements IMeasurementsService {
    constructor(
        @InjectRepository(Measurement)
        private readonly measurementsRepository: Repository<Measurement>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject('PusherService') private readonly pusherService: IPusherService,
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

        if (!measurement.pulse && !measurement.temperature && !measurement.sugar && !measurement.pressure) {
            return new HttpException('Please input at least one measurement.', HttpStatus.BAD_REQUEST);
        }

        measurement.user = user;

        const created =  await this.measurementsRepository.save(measurement as Measurement);

        await this.pusherService.createMeasurement(created, user.id);

        return created;
    }
}
