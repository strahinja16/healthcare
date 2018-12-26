import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/createUser.dto';
import { DeleteResult } from 'typeorm';
import {Prescription} from "../../prescriptions/entity/prescription.entity";
import {Examination} from "../../examinations/entity/examination.entity";
import {Measurement} from "../../measurements/entity/measurement.entity";

export interface IUsersService {
    findAll(): Promise<User[]>;
    findAllPatients(doctorId): Promise<User[]>;
    findPrescriptions(id): Promise<Prescription[] | null>;
    findExaminations(id): Promise<Examination[] | null>;
    findMeasurements(id): Promise<Measurement[] | null>;
    findById(id: string): Promise<User>;
    findOne(query: object): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, newValue: CreateUserDto): Promise<User | null>;
    updateDoctor(id: string, doctorId: string): Promise<User | null>;
    delete(id: string): Promise<DeleteResult>;
}
