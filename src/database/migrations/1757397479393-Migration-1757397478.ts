import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration17573974781757397479393 implements MigrationInterface {
    name = 'Migration17573974781757397479393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" SERIAL NOT NULL,
                "title" character varying(255) NOT NULL,
                "description" text,
                "status" character varying(50) NOT NULL,
                "priority" character varying(50) NOT NULL,
                "due_date" date,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "project_id" integer,
                "assigned_to" integer,
                CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "reminder" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "meeting_time" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                "project_id" integer,
                CONSTRAINT "REL_df1c02b9f9866d6e08c3ee2f34" UNIQUE ("user_id"),
                CONSTRAINT "REL_6c89aa4f640bdf571ae57fea9c" UNIQUE ("project_id"),
                CONSTRAINT "PK_9ec029d17cb8dece186b9221ede" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "status" character varying NOT NULL DEFAULT 'ACTIVE',
                "start_date" date NOT NULL,
                "end_date" date NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_9eae030e5c6bb7da4c61b9ff404" FOREIGN KEY ("assigned_to") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "FK_df1c02b9f9866d6e08c3ee2f348" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder"
            ADD CONSTRAINT "FK_6c89aa4f640bdf571ae57fea9c9" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_1cf56b10b23971cfd07e4fc6126"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "FK_6c89aa4f640bdf571ae57fea9c9"
        `);
        await queryRunner.query(`
            ALTER TABLE "reminder" DROP CONSTRAINT "FK_df1c02b9f9866d6e08c3ee2f348"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_9eae030e5c6bb7da4c61b9ff404"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "reminder"
        `);
        await queryRunner.query(`
            DROP TABLE "task"
        `);
    }

}
