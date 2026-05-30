import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration21780152994421 implements MigrationInterface {
  name = 'Migration21780152994421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`PRAGMA foreign_keys = OFF`);
    await queryRunner.query(
      `CREATE TABLE "temporary_threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(200) NOT NULL, "author" varchar(120) NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "newOldUnneededColumn" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_threads"("id", "title", "author", "body", "createdAt") SELECT "id", "title", "author", "body", "createdAt" FROM "threads"`,
    );
    await queryRunner.query(`DROP TABLE "threads"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_threads" RENAME TO "threads"`,
    );
    await queryRunner.query(`PRAGMA foreign_keys = ON`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`PRAGMA foreign_keys = OFF`);
    await queryRunner.query(
      `ALTER TABLE "threads" RENAME TO "temporary_threads"`,
    );
    await queryRunner.query(
      `CREATE TABLE "threads" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(200) NOT NULL, "author" varchar(120) NOT NULL, "body" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
    await queryRunner.query(
      `INSERT INTO "threads"("id", "title", "author", "body", "createdAt") SELECT "id", "title", "author", "body", "createdAt" FROM "temporary_threads"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_threads"`);
    await queryRunner.query(`PRAGMA foreign_keys = ON`);
  }
}
