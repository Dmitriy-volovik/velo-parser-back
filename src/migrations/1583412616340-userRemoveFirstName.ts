import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRemoveFirstName1583412616340 implements MigrationInterface {
  name = 'userRemoveFirstName1583412616340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `firstName`', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` ADD `firstName` varchar(255) NULL', undefined);
  }
}
