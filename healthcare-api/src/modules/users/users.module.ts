import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthMiddleware } from '../../common/middleware';
import { User } from './entity/user.entity';
import {Prescription} from "../prescriptions/entity/prescription.entity";
import {Examination} from "../examinations/entity/examination.entity";
import {Measurement} from "../measurements/entity/measurement.entity";
import {PusherModule} from 'src/modules/pusher/pusher.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Prescription, Examination, Measurement]), PusherModule],
    controllers: [UsersController],
    providers: [
        UsersService,
    ],
    exports: [UsersService],
})
export class UsersModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/users/:id', method: RequestMethod.DELETE },
                { path: '/users', method: RequestMethod.GET },
            );
    }
}
