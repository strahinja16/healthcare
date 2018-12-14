import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import { IsUUID } from 'class-validator';
import {User} from "../../users/entity/user.entity";

@Entity({
    name: "examinations",
})
export class Examination {
    @IsUUID("4")
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    showedUp: boolean;

    @Column()
    appointment: Date;

    @Column()
    note: string;

    @ManyToOne(type => User, user => user.examinations)
    user: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
