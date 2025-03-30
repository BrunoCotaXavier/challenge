import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Content } from 'src/content/entity'

@Injectable()
export class ContentRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOne(contentId: string): Promise<Content | null> {
    const [content] = await this.dataSource.query<Content[]>(
      `SELECT 
          c.*, 
          jsonb_build_object(
            'id', ct.id,
            'name', ct.name,
            'description', ct.description,
            'cover', ct.cover,
            'created_at', ct.created_at,
            'updated_at', ct.updated_at,
            'pdf_author', ct.pdf_author,
            'pdf_pages', ct.pdf_pages,
            'pdf_encrypted', ct.pdf_encrypted,
            'image_resolution', ct.image_resolution,
            'image_aspect_ratio', ct.image_aspect_ratio,
            'video_duration', ct.video_duration,
            'video_resolution', ct.video_resolution,
            'link_trusted', ct.link_trusted,
            'link_redirects', ct.link_redirects
          ) AS content_types,
          jsonb_build_object(
            'id', co.id,
            'name', co.name
          ) AS companies
       FROM contents c
       LEFT JOIN content_types ct ON c.types_id::uuid = ct.id
       LEFT JOIN companies co ON c.company_id::uuid = co.id
       WHERE c.id::uuid = $1
       AND c.deleted_at IS NULL 
       LIMIT 1`,
      [contentId],
    )

    console.log(content)

    return content || null
  }

  async findAll(): Promise<Content[]> {
    const contentList = await this.dataSource.query<Content[]>(
      `SELECT * FROM contents WHERE deleted_at IS NULL`,
    )

    return contentList
  }

  async findAllTypes(): Promise<Content[]> {
    const contentList = await this.dataSource.query<Content[]>(
      `SELECT type FROM contents WHERE deleted_at IS NULL`,
    )

    return contentList
  }
}
