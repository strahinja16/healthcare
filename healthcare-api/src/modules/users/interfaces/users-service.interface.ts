import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { DeleteResult } from 'typeorm';

export interface IUsersService {
    findAll(): Promise<User[]>;
    findAllPatients(doctorId): Promise<User[]>
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, newValue: CreateUserDto): Promise<User | null>;
    updateDoctor(id: string, doctorId: string): Promise<User | null>;
    delete(id: string): Promise<DeleteResult>;
}
