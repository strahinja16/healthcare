import { v4 as uuid } from 'uuid';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsUUID } from 'class-validator';
import { Examination } from '../../examinations/entity/examination.entity';
import { Measurement } from '../../measurements/entity/measurement.entity';
import { Prescription } from '../../prescriptions/entity/prescription.entity';
import { Gender } from '../enum/gender.enum';
import { BloodType } from '../enum/blood-type.enum';
import { PasswordRecovery } from '../../auth/entity/password-recovery.entity';
import { Status } from '../enum/status.enum';
import { CreateUserDto } from '../dto/createUser.dto';

@Entity({
  name: 'users',
})
export class User {

    constructor();
    constructor(user: CreateUserDto);
    constructor(user?: any)
    {
        this.lbo = uuid();
        this.id = user && user.id || undefined;
        this.name = user && user.name || undefined;
        this.email = user && user.email || undefined;
        this.password = user && user.password || undefined;
        this.doctorId = user && user.doctorId || undefined;
        this.height = user && user.height || undefined;
        this.weight = user && user.weight || undefined;
        this.bloodType = user && user.bloodType || undefined;
        this.isDoctor = user && user.isDoctor;
        this.gender = user && user.gender || undefined;
        this.birthday = user && user.birthday && new Date(user.birthday) || undefined;
        this.registerToken = user && user.registerToken || undefined;
        this.status = user && user.status === Status.Active ? Status.Active : Status.Inactive || undefined;
    }

    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
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

    @Column()
    lbo: string;

    @Column({
        nullable: true,
    })
    height: number;

    @Column({
        nullable: true,
    })
    weight: number;

    @Column('varchar', {
      nullable: true,
    })
    bloodType: BloodType;

    @Column('varchar', {
      nullable: true,
    })
    gender: Gender;

    @Column({
        nullable: true,
    })
    birthday: Date;

    @Column({
        type: 'varchar',
        default: Status.Inactive,
    })
    status: Status;

    @IsUUID('4')
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

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
