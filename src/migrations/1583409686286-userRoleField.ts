import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRoleField1583409686286 implements MigrationInterface {
  name = 'userRoleField1583409686286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `user` CHANGE `role` `role` varchar(255) NOT NULL DEFAULT 'user'", undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NOT NULL', undefined);
  }
}
