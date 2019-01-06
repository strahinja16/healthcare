import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsUUID } from 'class-validator';
import { User } from '../../users/entity/user.entity';

@Entity({
    name: 'labworks',
})
export class Labwork {
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    analysis: string;

    @Column()
    originalName: string;

    @Column()
    fileName: string;

    @ManyToOne(type => User, user => user.labworks)
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
