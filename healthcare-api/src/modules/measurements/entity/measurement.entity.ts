import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsUUID } from 'class-validator';
import { User } from '../../users/entity/user.entity';

@Entity({
    name: 'measurements',
})
export class Measurement {
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true,
    })
    pressure: string;

    @Column({
        type: 'numeric',
        precision: 3,
        nullable: true,
    })
    pulse: number;

    @Column({
        type: 'numeric',
        precision: 4,
        nullable: true,
        scale: 2,
    })
    sugar: number;

    @Column({
        type: 'numeric',
        precision: 4,
        nullable: true,
        scale: 2,
    })
    temperature: number;

    @ManyToOne(type => User, user => user.measurements)
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
