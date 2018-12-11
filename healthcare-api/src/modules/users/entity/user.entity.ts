import {
    Default,
    Table,
    Column,
    Model,
    IsUUID,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    PrimaryKey,
    IsEmail,
} from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

const tableOptions: IDefineOptions = { timestamps: true } as IDefineOptions;
@Table(tableOptions)
export class User extends Model<User> {

    @Default(Sequelize.UUIDV4)
    @IsUUID(4)
    @PrimaryKey
    @Column({
        field: 'ID',
    })
    id: string;

    @Column
    name: string;

    @IsEmail
    @Column
    email: string;

    @Column
    password: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}
