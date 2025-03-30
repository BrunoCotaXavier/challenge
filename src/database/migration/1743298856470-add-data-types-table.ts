import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddColumnsToContentTypesTable1743298856470 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE content_types
            ADD COLUMN description VARCHAR(255),
            ADD COLUMN cover VARCHAR(255),
            ADD COLUMN pdf_author VARCHAR(255),
            ADD COLUMN pdf_pages INT,
            ADD COLUMN pdf_encrypted BOOLEAN,
            ADD COLUMN image_resolution VARCHAR(255),
            ADD COLUMN image_aspect_ratio VARCHAR(255),
            ADD COLUMN video_duration INT,
            ADD COLUMN video_resolution VARCHAR(255),
            ADD COLUMN link_trusted BOOLEAN,
            ADD COLUMN link_redirects INT;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE content_types
            DROP COLUMN description,
            DROP COLUMN cover,
            DROP COLUMN pdf_author,
            DROP COLUMN pdf_pages,
            DROP COLUMN pdf_encrypted,
            DROP COLUMN image_resolution,
            DROP COLUMN image_aspect_ratio,
            DROP COLUMN video_duration,
            DROP COLUMN video_resolution,
            DROP COLUMN link_trusted,
            DROP COLUMN link_redirects;
    `)
  }
}
