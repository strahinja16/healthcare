import {IsBoolean, IsEmail, IsNumber, IsString, IsOptional} from 'class-validator';
import {BloodType} from "../enum/blood-type.enum";
import {Gender} from "../enum/gender.enum";

export class CreateUserDto {

    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsBoolean()
    readonly isDoctor: boolean;

    @IsOptional()
    @IsString()
    readonly doctorId: string;

    @IsOptional()
    @IsNumber()
    readonly height: number;

    @IsOptional()
    @IsNumber()
    readonly weight: number;

    @IsString()
    readonly bloodType: BloodType;

    @IsString()
    readonly gender: Gender;

    @IsOptional()
    @IsString()
    readonly birthday: string;

    @IsOptional()
    @IsString()
    readonly registerToken: string;

    @IsOptional()
    @IsString()
    readonly status: string;
}
