import { Module } from '@nestjs/common';
import { RequestedHelpsService } from './requestedHelps.service';
import { RequestedHelpsController } from './requestedHelps.controller';
import { RequestedHelp } from './entity/requestedHelp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { PusherModule } from '../pusher/pusher.module';

@Module({
  imports: [ TypeOrmModule.forFeature([RequestedHelp, User]), PusherModule],
  providers: [ { provide: 'RequestedHelpsService', useClass: RequestedHelpsService }],
  controllers: [RequestedHelpsController]
})
export class RequestedHelpsModule {}
