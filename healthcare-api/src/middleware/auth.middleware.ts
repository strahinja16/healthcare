import * as jwt from 'jsonwebtoken';
import {HttpException, HttpStatus, Injectable, NestMiddleware} from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization) {
                const decoded: any = jwt.verify((req.headers.authorization as string), 'secret');
                const user = await this.usersService.findById(decoded.id);
                if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
                next();
            } else {
                throw new HttpException('Unauthorized.', HttpStatus.UNAUTHORIZED);
            }
        };
    }
}
