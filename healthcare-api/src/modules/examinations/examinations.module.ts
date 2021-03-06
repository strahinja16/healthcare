import { Module } from '@nestjs/common';
import { ExaminationsController } from './examinations.controller';
import { ExaminationsService } from './examinations.service';
import { User } from '../users/entity/user.entity';
import { Examination } from './entity/examination.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PusherModule} from "../pusher/pusher.module";

@Module({
  imports: [TypeOrmModule.forFeature([Examination, User]), PusherModule],
  controllers: [ExaminationsController],
  providers: [
      { provide: 'IExaminationsService', useClass: ExaminationsService }
  ],
})
export class ExaminationsModule {}
