import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { IsUUID } from 'class-validator';
import {User} from "../../users/entity/user.entity";

@Entity({
    name: "measurements",
})
export class Measurement {
    @IsUUID("4")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    pressure: string;

    @Column()
    sugar: string;

    @Column()
    temperature: string;

    @ManyToOne(type => User, user => user.measurements)
    user: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
