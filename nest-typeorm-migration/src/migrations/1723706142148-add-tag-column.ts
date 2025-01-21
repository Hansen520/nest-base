/*
 * @Date: 2024-08-15 15:15:44
 * @Description: description
 */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTagColumn1723706142148 implements MigrationInterface {
  name = 'AddTagColumn1723706142148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`tags\` varchar(30) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`tags\``);
  }
}
