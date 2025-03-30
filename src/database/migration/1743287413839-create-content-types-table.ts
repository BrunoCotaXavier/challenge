import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateContentTypesTable1743287413839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE content_types (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    await queryRunner.query(`
      ALTER TABLE contents
        ADD COLUMN types_id VARCHAR(255),
        ADD COLUMN bytes INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN is_embeddable BOOLEAN DEFAULT FALSE,
        ADD COLUMN allow_download BOOLEAN DEFAULT FALSE,
        ADD COLUMN format VARCHAR(255)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE content_types')
  }
}
