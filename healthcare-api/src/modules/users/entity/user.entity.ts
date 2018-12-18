import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsUUID } from 'class-validator';
import { Examination } from "../../examinations/entity/examination.entity";
import { Measurement } from "../../measurements/entity/measurement.entity";
import { Prescription } from "../../prescriptions/entity/prescription.entity";
import { Gender } from "../enum/gender.enum";
import { BloodType } from "../enum/blood-type.enum";
import {PasswordRecovery} from "../../auth/entity/password-recovery.entity";
import {Status} from "../enum/status.enum";

@Entity({
  name: "users",
})
export class User {
    @IsUUID("4")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @IsEmail()
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    isDoctor: boolean;

    @Column({
        nullable: true,
    })
    doctorId: string;

    @Column({
        nullable: true,
    })
    height: number;

    @Column({
        nullable: true,
    })
    weight: number;

    @Column('varchar')
    bloodType: BloodType;

    @Column('varchar')
    gender: Gender;

    @Column({
        nullable: true,
    })
    birthday: Date;

    @Column({
        type: "varchar",
        default: Status.Inactive,
    })
    status: Status;

    @IsUUID("4")
    @Column({
        nullable: true,
    })
    registerToken: string;

    @OneToMany(type => Examination, examination => examination.user)
    examinations: Examination[];

    @OneToMany(type => Measurement, measurement => measurement.user)
    measurements: Measurement[];

    @OneToMany(type => Prescription, prescription => prescription.user)
    prescriptions: Prescription[];

    @OneToMany(type => PasswordRecovery, passwordRecovery => passwordRecovery.user)
    passwordRecoveries: PasswordRecovery[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
