import { MigrationInterface, QueryRunner } from 'typeorm';

export class userFirstnameDefault1583409881288 implements MigrationInterface {
  name = 'userFirstnameDefault1583409881288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NULL DEFAULT NULL', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NULL', undefined);
  }
}
