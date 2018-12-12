import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { IsEmail, IsUUID } from 'class-validator';

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

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
