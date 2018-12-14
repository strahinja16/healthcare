import { ApiModelProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString} from 'class-validator';

export class CreatePrescriptionDto {

    @IsString()
    @ApiModelProperty()
    readonly drug: string;

    @IsNumber()
    @ApiModelProperty()
    readonly hoursFrequency: number;

    @IsNumber()
    @ApiModelProperty()
    readonly quantity: number;

    @IsString()
    @ApiModelProperty()
    readonly note: string;

    @IsString()
    @ApiModelProperty()
    readonly dueDate: string;

    @IsString()
    @ApiModelProperty()
    readonly userId: string;
}
