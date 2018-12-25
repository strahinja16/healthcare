import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';
import { BloodType } from '../../users/enum/blood-type.enum';
import { Gender } from '../../users/enum/gender.enum';

export class RegisterDto {
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

    @IsOptional()
    @ApiModelProperty()
    readonly doctorId: string;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    readonly height: number;

    @IsOptional()
    @IsNumber()
    @ApiModelProperty()
    readonly weight: number;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly bloodType: BloodType;

    @IsOptional()
    @IsString()
    @ApiModelProperty()
    readonly gender: Gender;

    @IsOptional()
    @IsDateString()
    @ApiModelProperty()
    readonly birthday: string;
}
