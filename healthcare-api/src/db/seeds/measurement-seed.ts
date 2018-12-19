import * as faker from 'faker';
import { Measurement } from '../../modules/measurements/entity/measurement.entity';
import { INestApplication } from '@nestjs/common';

export class MeasurementSeed  {
  public static async up(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      const measurementRepository = app.get('MeasurementRepository');
      const insertData = [];

      const temperatures = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.2, 40, 40.5, 41];
      const pressures = ['120/80', '140/90', '150/88', '110/60', '120/70', '130/70', '200/ 100'];
      const sugars = [30, 31.34, 32.90, 33.8, 35.6, 38.21, 39.43, 40];
      const pulses = [];
      for (let i = 65; i < 210; i += 5) {
        pulses.push(i);
      }

      const patients = await usersRepository.find({ isDoctor: false });

      patients.forEach(patient => {
          let measurement = new Measurement();
          measurement.user = patient;
          measurement.pressure = faker.random.arrayElement(pressures);
          measurement.pulse = faker.random.arrayElement(pulses);
          insertData.push(measurementRepository.save(measurement));

          measurement = new Measurement();
          measurement.user = patient;
          measurement.sugar = faker.random.arrayElement(sugars);
          insertData.push(measurementRepository.save(measurement));

          measurement = new Measurement();
          measurement.user = patient;
          measurement.temperature = faker.random.arrayElement(temperatures);
          insertData.push(measurementRepository.save(measurement));

          measurement = new Measurement();
          measurement.user = patient;
          measurement.pressure = faker.random.arrayElement(pressures);
          measurement.pulse = faker.random.arrayElement(pulses);
          measurement.temperature = faker.random.arrayElement(temperatures);
          measurement.sugar = faker.random.arrayElement(sugars);
          insertData.push(measurementRepository.save(measurement));
      });

      await Promise.all(insertData);
  }

  public static async down(app: INestApplication) {
      const measurementRepository = app.get('MeasurementRepository');
      await measurementRepository.delete(await measurementRepository.find());
  }
}
