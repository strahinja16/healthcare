import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsUUID } from 'class-validator';
import { User } from '../../users/entity/user.entity';

@Entity({
    name: 'prescriptions',
})
export class Prescription {
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    drug: string;

    @Column()
    hoursFrequency: number;

    @Column()
    quantity: number;

    @Column()
    note: string;

    @Column()
    disease: string;

    @Column()
    dueDate: Date;

    @ManyToOne(type => User, user => user.prescriptions)
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
