
import { Injectable, Inject} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UsersRepository') private readonly usersRepository: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.findAll<User>();
    }

    async findById(id: number): Promise<User> {
        return await this.usersRepository.findById(id);
    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.create<User>(createUserDto);
    }

    async update(id: number, newValue: CreateUserDto): Promise<User | null> {

        let user = await this.usersRepository.findById<User>(id);

        if (!user.id) {
            // tslint:disable-next-line:no-console
            console.error('user doesn\'t exist');
        }

        user = this._assign(user, newValue);

        return await user.save({ returning: true });
    }

    public async delete(ID: number): Promise<number> {

        return await this.usersRepository.destroy({
            where: { ID },
        });
    }

    private _assign(user: CreateUserDto, newValue: CreateUserDto): User {
        // tslint:disable-next-line:no-string-literal
        for (const key of Object.keys(user['dataValues'])) {
            if (user[key] !== newValue[key]) {
                //
                user[key] = newValue[key];
            }
        }
        return user as User;
    }
}
