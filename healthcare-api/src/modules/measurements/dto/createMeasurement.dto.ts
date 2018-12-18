import { IsString} from 'class-validator';

export class CreateMeasurementDto {

    @IsString()
    readonly pressure: string;

    @IsString()
    readonly sugar: string;

    @IsString()
    readonly temperature: string;

    @IsString()
    readonly userId: string;
}
