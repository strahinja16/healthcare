import { Module } from '@nestjs/common';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entity/prescription.entity';
import { User } from '../users/entity/user.entity';
import {PusherModule} from "../pusher/pusher.module";

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, User]), PusherModule],
  controllers: [PrescriptionsController],
    providers: [
        { provide: 'IPrescriptionsService', useClass: PrescriptionsService }
    ]})
export class PrescriptionsModule {}
