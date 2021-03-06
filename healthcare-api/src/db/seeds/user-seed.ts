import * as faker from 'faker';
import { User } from '../../modules/users/entity/user.entity';
import { BloodType } from '../../modules/users/enum/blood-type.enum';
import { Gender } from '../../modules/users/enum/gender.enum';
import * as crypto from 'crypto';
import { Status } from '../../modules/users/enum/status.enum';
import { INestApplication } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class UserSeed  {
  public static async up(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      const insertData = [];
      const bloodTypes = Object.keys(BloodType).map(key => BloodType[key]);
      const genders = Object.keys(Gender).map(key => Gender[key]);
      const doctorIds = [uuid(), uuid(), uuid(), uuid(), uuid()];

      for (let i = 0; i < 5; i += 1) {

        const user = new User();

        user.lbo = faker.random.alphaNumeric({ count: 6 });
        user.id = doctorIds[i];
        user.name = faker.name.findName();
        user.password = crypto.createHmac('sha256', 'test').digest('hex');
        user.email = `doctor${i}@test.com`;
        user.birthday = faker.date.between(new Date(1950, 1, 1), new Date(2010, 12, 31));
        user.bloodType = faker.random.arrayElement(bloodTypes);
        user.gender = faker.random.arrayElement(genders);
        user.height = faker.random.number({ min: 160, max: 190 });
        user.isDoctor = true;
        user.weight = faker.random.number({ min: 60, max: 120 });
        user.status = Status.Active;

        insertData.push(usersRepository.save(user));
      }

      for (let i = 0; i < 10; i += 1) {

          const user = new User();

          user.lbo = uuid();
          user.name = faker.name.findName();
          user.password = crypto.createHmac('sha256', 'test').digest('hex');
          user.email = `user${i}@test.com`;
          user.birthday = faker.date.between(new Date(1950, 1, 1), new Date(2010, 12, 31));
          user.bloodType = faker.random.arrayElement(bloodTypes);
          user.gender = faker.random.arrayElement(genders);
          user.height = faker.random.number({ min: 160, max: 190 });
          user.isDoctor = false;
          user.weight = faker.random.number({ min: 60, max: 120 });
          user.status = Status.Active;
          user.doctorId = faker.random.arrayElement(doctorIds);

          insertData.push(usersRepository.save(user));
      }
      await Promise.all(insertData);
  }

  public static async down(app: INestApplication) {
      const usersRepository = app.get('UserRepository');
      await usersRepository.delete(await usersRepository.find());
  }
}
