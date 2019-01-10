import { IsString, IsJSON } from 'class-validator';

export class CreateRequestedHelpDto {
    @IsJSON()
    readonly coordinates: { latitude: number, longitude: number };

    @IsString()
    readonly userId: string;

    @IsString()
    readonly channel: string;
}
