import { IsString, IsOptional, IsUUID, MaxLength, Length } from 'class-validator';

export class CreateMeasurementDto {

    @IsOptional()
    @IsString()
    readonly pressure: string;

    @IsOptional()
    @IsString()
    @Length(1, 3)
    readonly pulse: string;

    @IsOptional()
    @IsString()
    @MaxLength(5)
    readonly sugar: string;

    @IsOptional()
    @IsString()
    @MaxLength(5)
    readonly temperature: string;

    @IsUUID()
    readonly userId: string;
}
