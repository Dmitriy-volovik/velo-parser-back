import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1583344256487 implements MigrationInterface {
  name = 'createUsersTable1583344256487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` ADD `firstName` varchar(255) NOT NULL', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `firstName`', undefined);
  }
}
