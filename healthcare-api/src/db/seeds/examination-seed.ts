import * as faker from 'faker';
import { Examination } from '../../modules/examinations/entity/examination.entity';
import { INestApplication } from '@nestjs/common';

export class ExaminationSeed  {
  public static async up(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      const examinationRepository = app.get('ExaminationRepository');
      const insertData = [];

      const patients = await usersRepository.find({ isDoctor: false });

      patients.forEach(patient => {
          for (let i = 0; i < 5; i++) {
              const examination = new Examination();
              examination.appointment = faker.date.past();
              examination.showedUp = faker.random.boolean();
              examination.user = patient;
              examination.note = faker.lorem.sentence();
              insertData.push(examinationRepository.save(examination));
          }

          for (let i = 0; i < 2; i++) {
              const examination = new Examination();
              examination.appointment = faker.date.future();
              examination.showedUp = false;
              examination.user = patient;
              examination.note = faker.lorem.sentence();
              insertData.push(examinationRepository.save(examination));
          }
      });

      await Promise.all(insertData);
  }

  public static async down(app: INestApplication) {
      const examinationRepository = app.get('ExaminationRepository');
      await examinationRepository.delete(await examinationRepository.find());
  }
}
