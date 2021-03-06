
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreatePrescriptionDto } from './dto/createPrescription.dto';
import { Prescription } from './entity/prescription.entity';
import { User } from '../users/entity/user.entity';
import { IPrescriptionsService } from './interfaces/prescriptions-service.interface';
import {IPusherService} from "../pusher/interfaces/pusher-service.interface";

@Injectable()
export class PrescriptionsService implements IPrescriptionsService{
    constructor(
        @InjectRepository(Prescription)
        private readonly prescriptionsRepository: Repository<Prescription>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject('PusherService') private readonly pusherService: IPusherService,
    ) {}

    async findById(id: string): Promise<Prescription> {
        return await this.prescriptionsRepository.findOne(id);
    }

    async findOne(query: object): Promise<Prescription> {
        return await this.prescriptionsRepository.findOne(query);
    }

    async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription | HttpException> {

        const { userId, ... prescriptionDto} = createPrescriptionDto;

        const user: User = await this.usersRepository.findOne(userId);
        if (!user) {
            return new HttpException('User not found.', HttpStatus.BAD_REQUEST);
        }

        const prescription: Partial<Prescription> = {
            ... prescriptionDto,
            user: null,
            dueDate: new Date(prescriptionDto.dueDate),
        };
        prescription.user = user;

        const created = await this.prescriptionsRepository.save(prescription as Prescription);

        await this.pusherService.createPrescription(created, user.id);

        return created;
    }

    async update(id: string, newValue: CreatePrescriptionDto): Promise<Prescription | null> {

        let prescription = await this.prescriptionsRepository.findOne(id);

        if (!prescription.id) {
            throw new HttpException('Prescription does not exist', HttpStatus.BAD_REQUEST);
        }

        prescription = this._assign(prescription, newValue);

        return await this.prescriptionsRepository.save(prescription);
    }

    private _assign(prescription: Prescription, newValue: CreatePrescriptionDto): Prescription {
        // tslint:disable-next-line:no-string-literal
        for (const key of Object.keys(newValue)) {
            if (prescription[key] !== newValue[key]) {
                //
                prescription[key] = newValue[key];
            }
        }
        return prescription as Prescription;
    }
}
