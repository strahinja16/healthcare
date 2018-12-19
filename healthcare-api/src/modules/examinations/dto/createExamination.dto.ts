import { IsBoolean, IsString } from 'class-validator';

export class CreateExaminationDto {

    @IsBoolean()
    readonly showedUp: boolean;

    @IsString()
    readonly appointment: string;

    @IsString()
    readonly note: string;

    @IsString()
    readonly userId: string;
}
