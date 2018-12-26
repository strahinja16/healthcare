import { Examination } from '../entity/examination.entity';
import { CreateExaminationDto } from '../dto/createExamination.dto';
import { HttpException } from '@nestjs/common';

export interface IExaminationsService {
    findById(id: string): Promise<Examination>;
    findOne(query: object): Promise<Examination>;
    create(createExaminationDto: CreateExaminationDto): Promise<Examination | HttpException>;
    update(id: string, newValue: CreateExaminationDto): Promise<Examination | null>;
    updateArrival(id: string): Promise<Examination | null>
}
