import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1545074298321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "sugar"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "sugar" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "temperature" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "temperature" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "sugar"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "sugar" integer NOT NULL`);
    }

}
