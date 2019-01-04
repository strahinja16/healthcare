
import * as moment from 'moment';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entity/user.entity';
import { IUsersService } from './interfaces/users-service.interface';
import {Prescription} from "../prescriptions/entity/prescription.entity";
import {Examination} from "../examinations/entity/examination.entity";
import {Measurement} from "../measurements/entity/measurement.entity";
import {Pusher} from "../pusher/pusher";

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Prescription)
        private readonly prescriptionsRepository: Repository<Prescription>,
        @InjectRepository(Examination)
        private readonly examinationsRepository: Repository<Examination>,
        @InjectRepository(Measurement)
        private readonly measurementsRepository: Repository<Measurement>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findAllPatients(doctorId): Promise<User[]> {
        return await this.usersRepository.find({ where: { doctorId }});
    }

    async findPrescriptions(id): Promise<Prescription[] | null> {
        const prescriptions = await this.prescriptionsRepository.find({ relations: ['user']});
        return prescriptions
            .filter(pres => pres.user.id ===  id && moment().isBefore(moment(pres.dueDate)) )
            .sort((a, b) => moment(a.dueDate).isBefore(b.dueDate) ? 1 : -1);
    }

    async findExaminations(id): Promise<Examination[] | null> {
        const examinations = await this.examinationsRepository.find({ relations: ['user']});
        return examinations
            .filter(exam => exam.user.id === id)
            .sort((a, b) => moment(a.appointment).isBefore(b.appointment) ? 1 : -1);
    }

    async findMeasurements(id): Promise<Measurement[] | null> {
        const measurements = await this.measurementsRepository.find({ relations: ['user']});
        return measurements
            .filter(measurement => measurement.user.id ===  id);
    }

    async findById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findOne(query: object): Promise<User> {
        return await this.usersRepository.findOne(query);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersRepository.save(new User(createUserDto));
    }

    async update(id: string, newValue: CreateUserDto): Promise<User | null> {

        let user = await this.usersRepository.findOne(id);

        if (!user.id) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        user = this._assign(user, newValue);

        const updated = await this.usersRepository.save(user);

        await Pusher.updateUser(updated);

        return updated;
    }

    async updateDoctor(lbo: string, doctorId: string): Promise<User | null> {

        let user = await this.findOne({ where: { lbo }});
        if (!user) {
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        }

        user.doctorId = doctorId;

        return await this.usersRepository.save(user);
    }
    public async delete(id: string): Promise<DeleteResult> {

        return await this.usersRepository.delete(id);
    }

    private _assign(user: User, newValue: CreateUserDto) {
        // tslint:disable-next-line:no-string-literal
        for (const key of Object.keys(newValue)) {
            if (user[key] !== newValue[key]) {
                //
                user[key] = newValue[key];
            }
        }
        return user;
    }
}
