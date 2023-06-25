import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AccountTable1679150991642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '225',
            isNullable: false,
          },
          {
            name: 'balance',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'branch',
            type: 'smallint',
            isNullable: true,
          },
          {
            name: 'bank_code',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account');
  }
}
