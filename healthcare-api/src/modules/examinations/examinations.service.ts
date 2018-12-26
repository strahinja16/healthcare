
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateExaminationDto } from './dto/createExamination.dto';
import { Examination } from './entity/examination.entity';
import { User } from '../users/entity/user.entity';
import { IExaminationsService } from './interfaces/examinations-service.interface';

@Injectable()
export class ExaminationsService implements IExaminationsService{
    constructor(
        @InjectRepository(Examination)
        private readonly examinationsRepository: Repository<Examination>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async findById(id: string): Promise<Examination> {
        return await this.examinationsRepository.findOne(id);
    }

    async findOne(query: object): Promise<Examination> {
        return await this.examinationsRepository.findOne(query);
    }

    async create(createExaminationDto: CreateExaminationDto): Promise<Examination | HttpException> {

        const { userId, ... examinationDto} = createExaminationDto;

        const user: User = await this.usersRepository.findOne(userId);
        if (!user) {
            return new HttpException('User not found.', HttpStatus.BAD_REQUEST);
        }

        const examination = { ... examinationDto, user: null, appointment: new Date(examinationDto.appointment) };
        examination.user = user;

        return await this.examinationsRepository.save(examination as Examination);
    }

    async update(id: string, newValue: CreateExaminationDto): Promise<Examination | null> {

        let examination = await this.examinationsRepository.findOne(id);

        if (!examination.id) {
            throw new HttpException('Examination does not exist', HttpStatus.BAD_REQUEST);
        }

        examination = this._assign(examination, newValue);

        return await this.examinationsRepository.save(examination);
    }

    async updateArrival(id: string): Promise<Examination | null> {

        let examination = await this.examinationsRepository.findOne(id);

        if (!examination.id) {
            throw new HttpException('Examination does not exist', HttpStatus.BAD_REQUEST);
        }

        examination.showedUp = true;

        return await this.examinationsRepository.save(examination);
    }

    private _assign(examination: Examination, newValue: CreateExaminationDto): Examination {
        // tslint:disable-next-line:no-string-literal
        for (const key of Object.keys(newValue)) {
            if (examination[key] !== newValue[key]) {
                //
                examination[key] = newValue[key];
            }
        }
        return examination as Examination;
    }
}
