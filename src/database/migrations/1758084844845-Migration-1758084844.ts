import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration17580848441758084844845 implements MigrationInterface {
    name = 'Migration17580848441758084844845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "FK_df1c02b9f9866d6e08c3ee2f348"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "REL_df1c02b9f9866d6e08c3ee2f34"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "FK_6c89aa4f640bdf571ae57fea9c9"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "REL_6c89aa4f640bdf571ae57fea9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "FK_6c89aa4f640bdf571ae57fea9c9" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "FK_6c89aa4f640bdf571ae57fea9c9"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "REL_6c89aa4f640bdf571ae57fea9c" UNIQUE ("project_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "FK_6c89aa4f640bdf571ae57fea9c9" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD "user_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "REL_df1c02b9f9866d6e08c3ee2f34" UNIQUE ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "FK_df1c02b9f9866d6e08c3ee2f348" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
