import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/entity/user.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'postgres',
                port: 5432,
                username: 'root',
                password: 'root',
                database: 'healthcare',
            });
            sequelize.addModels([User]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
