import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../modules/users/entity/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization) {
                const decoded: any = jwt.verify((req.headers.authorization as string), 'secret' || '');
                const user = await User.findOne<User>({
                    where: {
                        id: decoded.id,
                        email: decoded.email,
                    },
                });
                if (!user) throw Error('User not found.');
                next();
            } else {
                throw Error('Unauthorized.');
            }
        };
    }
}
