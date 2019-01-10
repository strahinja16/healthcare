import { IsNumberString, IsString } from 'class-validator';

export class ConfirmHelpDto {
    @IsNumberString()
    readonly distance: number;

    @IsNumberString()
    readonly duration: number;

    @IsString()
    readonly channel: string;
}

