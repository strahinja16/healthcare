
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findOne(query: object): Promise<User> {
        return await this.usersRepository.findOne(query);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.save(createUserDto as User);
    }

    async update(id: string, newValue: CreateUserDto): Promise<User | null> {

        console.log(newValue);
        let user = await this.usersRepository.findOne(id);

        if (!user.id) {
            // tslint:disable-next-line:no-console
            console.error('user doesn\'t exist');
        }

        user = this._assign(user, newValue);

        return await this.usersRepository.save(user);
    }

    public async delete(id: string): Promise<DeleteResult> {

        return await this.usersRepository.delete(id);
    }

    private _assign(user: CreateUserDto, newValue: CreateUserDto): User {
        // tslint:disable-next-line:no-string-literal
        for (const key of Object.keys(newValue)) {
            if (user[key] !== newValue[key]) {
                //
                user[key] = newValue[key];
            }
        }
        return user as User;
    }
}
