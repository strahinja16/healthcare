import { IsString } from 'class-validator';

export class CreateLabworkDto {
    @IsString()
    readonly analysis: string;

    @IsString()
    readonly userId: string;

    readonly file: any;
}
