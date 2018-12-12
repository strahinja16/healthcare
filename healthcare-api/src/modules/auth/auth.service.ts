import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { IJwtOptions } from './interfaces/auth-service.interface';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { UsersService } from "../users/users.service";
import {ConfigService} from "../config/config.service";

@Injectable()
export class AuthService  {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {}

    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: this.configService.get('JWTID'),
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

     public async login(credentials: { email: string; password: string }): Promise<IAuthResponse> {

         const user = await this.usersService.findOne({
            where: {
                email: credentials.email,
                password: crypto.createHmac('sha256', credentials.password).digest('hex'),
            },
        });
        if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = await jwt.sign(payload, this.configService.get('JWTID'), this._options);

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
        const user = await this.usersService.create(encryptedCredentials);
        if (!user) throw new HttpException('Error creating new user', HttpStatus.INTERNAL_SERVER_ERROR);

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token =  await jwt.sign(payload, this.configService.get('JWTID'), this._options);

        //TODO omit password
        return {
            user,
            token,
        };
    }
}
