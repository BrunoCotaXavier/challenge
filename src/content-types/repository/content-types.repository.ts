import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { ContentType } from 'src/content-types/entity'

@Injectable()
export class ContentTypesRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOne(contentId: string): Promise<ContentType | null> {
    const [content] = await this.dataSource.query<ContentType[]>(
      `SELECT * FROM content-types WHERE id = '${contentId}' AND deleted_at IS NULL LIMIT 1`,
    )

    return content || null
  }

  async findAll(): Promise<ContentType[]> {
    const contentList = await this.dataSource.query<ContentType[]>(`SELECT * FROM content_types`)

    return contentList
  }
}
