import {MigrationInterface, QueryRunner} from "typeorm";

export class entites1544738482427 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "measurements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pressure" character varying NOT NULL, "sugar" character varying NOT NULL, "temperature" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "drug" character varying NOT NULL, "hoursFrequency" integer NOT NULL, "quantity" integer NOT NULL, "note" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_097b2cc2f2b7e56825468188503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isDoctor" boolean NOT NULL, "doctorId" character varying NOT NULL, "height" integer NOT NULL, "weight" integer NOT NULL, "bloodType" character varying NOT NULL, "gender" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "examinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "showedUp" boolean NOT NULL, "appointment" TIMESTAMP NOT NULL, "note" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_7694851ac6eaf734b64fcf06c28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD CONSTRAINT "FK_2d508b791a9a6fcc0845207bb26" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "prescriptions" ADD CONSTRAINT "FK_35cbbc56c94726c18d9e74fb1e2" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD CONSTRAINT "FK_6d6b69d5a89dc5b490a6cf44eb0" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "examinations" DROP CONSTRAINT "FK_6d6b69d5a89dc5b490a6cf44eb0"`);
        await queryRunner.query(`ALTER TABLE "prescriptions" DROP CONSTRAINT "FK_35cbbc56c94726c18d9e74fb1e2"`);
        await queryRunner.query(`ALTER TABLE "measurements" DROP CONSTRAINT "FK_2d508b791a9a6fcc0845207bb26"`);
        await queryRunner.query(`DROP TABLE "examinations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "prescriptions"`);
        await queryRunner.query(`DROP TABLE "measurements"`);
    }

}
