import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTypeIdToContentsTable1743289582009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE contents
        ADD COLUMN type_id UUID,
        ADD CONSTRAINT fk_content_type FOREIGN KEY (type_id) REFERENCES content_types(id) ON DELETE SET NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE contents
        DROP CONSTRAINT fk_content_type,
        DROP COLUMN type_id;
    `)
  }
}
