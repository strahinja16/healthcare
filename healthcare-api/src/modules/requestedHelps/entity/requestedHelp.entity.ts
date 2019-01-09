import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsUUID } from 'class-validator';
import { User } from '../../users/entity/user.entity';

@Entity({
    name: 'requestedHelps',
})
export class RequestedHelp {
    @IsUUID('4')
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('json')
    coordinates: { latitude: number, longitude: number };

    @ManyToOne(type => User, user => user.requestedHelps)
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
