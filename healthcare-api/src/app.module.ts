import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nest-modules/mailer';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { ExaminationsModule } from './modules/examinations/examinations.module';
import { MeasurementsModule } from './modules/measurements/measurements.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      MailerModule.forRoot(),
      UsersModule,
      AuthModule,
      ConfigModule,
      PrescriptionsModule,
      ExaminationsModule,
      MeasurementsModule,
  ],
})
export class AppModule {}
