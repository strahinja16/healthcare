import { Module } from '@nestjs/common';
import { LabworksService } from './labworks.service';
import { LabworksController } from './labworks.controller';
import {Labwork} from './entity/labwork.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from "../users/entity/user.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([Labwork, User])],
  providers: [ { provide: 'LabworksService', useClass: LabworksService }],
  controllers: [LabworksController]
})
export class LabworksModule {}
