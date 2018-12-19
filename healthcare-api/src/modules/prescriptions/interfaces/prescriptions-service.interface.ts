import { Prescription } from "../entity/prescription.entity";
import { CreatePrescriptionDto } from "../dto/createPrescription.dto"
import { HttpException } from "@nestjs/common";

export interface IPrescriptionsService {
    findById(id: string): Promise<Prescription>;
    findOne(query: object): Promise<Prescription>
    create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription | HttpException>;
    update(id: string, newValue: CreatePrescriptionDto): Promise<Prescription | null>;
}
