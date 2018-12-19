import { IsNumber, IsString } from 'class-validator';

export class CreatePrescriptionDto {

    @IsString()
    readonly drug: string;

    @IsNumber()
    readonly hoursFrequency: number;

    @IsNumber()
    readonly quantity: number;

    @IsString()
    readonly note: string;

    @IsString()
    readonly dueDate: string;

    @IsString()
    readonly userId: string;
}
