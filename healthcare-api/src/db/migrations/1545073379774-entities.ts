import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1545073379774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "sugar"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "sugar" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "temperature" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "temperature"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "temperature" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurements" DROP COLUMN "sugar"`);
        await queryRunner.query(`ALTER TABLE "measurements" ADD "sugar" character varying NOT NULL`);
    }

}
