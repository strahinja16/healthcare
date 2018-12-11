import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import {AuthMiddleware} from '../../middleware';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService, ...usersProviders],
})
export class UsersModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/users/:id', method: RequestMethod.DELETE },
            );
    }
}
