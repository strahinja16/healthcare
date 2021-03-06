import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1546989212546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "examinations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "showedUp" boolean NOT NULL, "appointment" TIMESTAMP NOT NULL, "note" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_7694851ac6eaf734b64fcf06c28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "measurements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pressure" character varying, "pulse" numeric(3), "sugar" numeric(4,2), "temperature" numeric(4,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_3c0e7812563f27fd68e8271661b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "drug" character varying NOT NULL, "hoursFrequency" integer NOT NULL, "quantity" integer NOT NULL, "note" character varying NOT NULL, "disease" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_097b2cc2f2b7e56825468188503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "labworks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "analysis" character varying NOT NULL, "originalName" character varying NOT NULL, "fileName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_fe7ab924189797ac3ba6e1c97ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requestedHelps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "coordinates" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_72e8fa0af9ea4d9a2c307144f8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isDoctor" boolean NOT NULL, "doctorId" character varying, "lbo" character varying NOT NULL, "height" integer, "weight" integer, "bloodType" character varying, "gender" character varying, "birthday" TIMESTAMP, "status" character varying NOT NULL DEFAULT 'inactive', "registerToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passwordRecoveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_913b5c2ca4b13932eaefd1a0592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "examinations" ADD CONSTRAINT "FK_6d6b69d5a89dc5b490a6cf44eb0" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD CONSTRAINT "FK_2d508b791a9a6fcc0845207bb26" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "prescriptions" ADD CONSTRAINT "FK_35cbbc56c94726c18d9e74fb1e2" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "labworks" ADD CONSTRAINT "FK_bd3004836027a6a46f3d913d771" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "requestedHelps" ADD CONSTRAINT "FK_8f224e89544dfcf1b614d20adb0" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "passwordRecoveries" ADD CONSTRAINT "FK_61b5006cf4f74b04b2265553e7d" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "passwordRecoveries" DROP CONSTRAINT "FK_61b5006cf4f74b04b2265553e7d"`);
        await queryRunner.query(`ALTER TABLE "requestedHelps" DROP CONSTRAINT "FK_8f224e89544dfcf1b614d20adb0"`);
        await queryRunner.query(`ALTER TABLE "labworks" DROP CONSTRAINT "FK_bd3004836027a6a46f3d913d771"`);
        await queryRunner.query(`ALTER TABLE "prescriptions" DROP CONSTRAINT "FK_35cbbc56c94726c18d9e74fb1e2"`);
        await queryRunner.query(`ALTER TABLE "measurements" DROP CONSTRAINT "FK_2d508b791a9a6fcc0845207bb26"`);
        await queryRunner.query(`ALTER TABLE "examinations" DROP CONSTRAINT "FK_6d6b69d5a89dc5b490a6cf44eb0"`);
        await queryRunner.query(`DROP TABLE "passwordRecoveries"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "requestedHelps"`);
        await queryRunner.query(`DROP TABLE "labworks"`);
        await queryRunner.query(`DROP TABLE "prescriptions"`);
        await queryRunner.query(`DROP TABLE "measurements"`);
        await queryRunner.query(`DROP TABLE "examinations"`);
    }

}
