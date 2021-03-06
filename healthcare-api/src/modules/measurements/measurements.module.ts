import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { User } from '../users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entity/measurement.entity';
import {PusherModule} from "../pusher/pusher.module";

@Module({
  imports: [TypeOrmModule.forFeature([ Measurement, User]), PusherModule],
  controllers: [MeasurementsController],
    providers: [
        { provide: 'IMeasurementsService', useClass: MeasurementsService }
    ],})
export class MeasurementsModule {}
