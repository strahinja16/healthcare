import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { IJwtOptions } from './interfaces/auth-service.interface';
import { User } from '../users/entity/user.entity';
import { IAuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService  {

    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: 'secret' || '',
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

     public async login(credentials: { email: string; password: string }): Promise<IAuthResponse> {
        const user = await User.findOne<User>({
            where: {
                email: credentials.email,
                password: crypto.createHmac('sha256', credentials.password).digest('hex'),
            },
        });
        if (!user) throw Error('User not found');

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = await jwt.sign(payload, 'secret' || '', this._options);

        //TODO omit password

         return {
             user,
             token,
         };
    }

    public async register(credentials: { email: string; password: string, name: string, }): Promise<IAuthResponse> {
        const encryptedCredentials = {
            ...credentials,
            password: crypto.createHmac('sha256', credentials.password).digest('hex'),
        };
        const user = await User.create<User>(encryptedCredentials);
        if (!user) throw Error('Error creating new user');

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token =  await jwt.sign(payload, 'secret', this._options);

        //TODO omit password
        return {
            user,
            token,
        };
    }
}