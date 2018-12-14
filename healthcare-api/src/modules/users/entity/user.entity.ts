import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsUUID } from 'class-validator';
import { Examination } from "../../examinations/entity/examination.entity";
import { Measurement } from "../../measurements/entity/measurement.entity";
import { Prescription } from "../../prescriptions/entity/prescription.entity";
import { Gender } from "../enum/gender.enum";
import { BloodType } from "../enum/blood-type.enum";

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
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isDoctor: boolean;

    @Column()
    doctorId: string;

    @Column()
    height: number;

    @Column()
    weight: number;

    @Column('varchar')
    bloodType: BloodType;

    @Column('varchar')
    gender: Gender;

    @Column()
    birthday: Date;

    @OneToMany(type => Examination, examination => examination.user)
    examinations: Examination[];

    @OneToMany(type => Measurement, measurement => measurement.user)
    measurements: Measurement[];

    @OneToMany(type => Prescription, prescription => prescription.user)
    prescriptions: Prescription[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
