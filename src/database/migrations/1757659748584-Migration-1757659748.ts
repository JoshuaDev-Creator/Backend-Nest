import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration17576597481757659748584 implements MigrationInterface {
    name = 'Migration17576597481757659748584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."task_status_enum" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED')
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "status" "public"."task_status_enum" NOT NULL DEFAULT 'PENDING'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."task_status_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "status" character varying NOT NULL DEFAULT 'PENDING'
        `);
    }

}
