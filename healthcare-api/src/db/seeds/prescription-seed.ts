import * as faker from 'faker';
import { Prescription } from '../../modules/prescriptions/entity/prescription.entity';
import { INestApplication } from '@nestjs/common';

export class PrescriptionSeed  {
  public static async up(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      const prescriptionRepository = app.get('PrescriptionRepository');
      const insertData = [];

      const drugs = ['Abarelix', 'Benzagel', 'Bosentan', 'Cedax', 'Celecoxib', 'Daptacel', 'Dactinomycin', 'Efudex', 'Fenofibrate', 'Kapidex'];
      const hours = [1, 3, 6, 8, 12, 24, 48];

      const patients = await usersRepository.find({ isDoctor: false });

      patients.forEach(patient => {
          let prescription = new Prescription();
          prescription.drug = faker.random.arrayElement(drugs);
          prescription.hoursFrequency = faker.random.arrayElement(hours);
          prescription.quantity = faker.random.number({ min: 1, max: 5});
          prescription.note = faker.lorem.sentence();
          prescription.dueDate = faker.date.future();
          prescription.user = patient;
          insertData.push(prescriptionRepository.save(prescription));

          prescription = new Prescription();
          prescription.drug = faker.random.arrayElement(drugs);
          prescription.hoursFrequency = faker.random.arrayElement(hours);
          prescription.quantity = faker.random.number({ min: 1, max: 5});
          prescription.note = faker.lorem.sentence();
          prescription.dueDate = faker.date.future();
          prescription.user = patient;
          insertData.push(prescriptionRepository.save(prescription));
      });

      await Promise.all(insertData);
  }

  public static async down(app: INestApplication) {
      const prescriptionRepository = app.get('PrescriptionRepository');
      await prescriptionRepository.delete(await prescriptionRepository.find());
  }
}
