import { ApiModelProperty } from '@nestjs/swagger';
import {IsBoolean, IsEmail, IsNumber, IsString} from 'class-validator';
import {BloodType} from "../enum/blood-type.enum";
import {Gender} from "../enum/gender.enum";

export class CreateUserDto {

    @IsString()
    @ApiModelProperty()
    readonly name: string;

    @IsEmail()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @ApiModelProperty()
    readonly password: string;

    @IsBoolean()
    @ApiModelProperty()
    readonly isDoctor: boolean;

    @IsString()
    @ApiModelProperty()
    readonly doctorId: string;

    @IsNumber()
    @ApiModelProperty()
    readonly height: number;

    @IsNumber()
    @ApiModelProperty()
    readonly weight: number;

    @IsString()
    @ApiModelProperty()
    readonly bloodType: BloodType;

    @IsString()
    @ApiModelProperty()
    readonly gender: Gender;

    @IsString()
    @ApiModelProperty()
    readonly birthday: string;
}
