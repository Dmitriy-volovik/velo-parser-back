import { MigrationInterface, QueryRunner } from 'typeorm';

export class userFirstnameNullable1583412489004 implements MigrationInterface {
  name = 'userFirstnameNullable1583412489004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NULL DEFAULT NULL', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NULL', undefined);
  }
}
