import { Content } from 'src/content/entity'
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm'

@Entity('content_types')
export class ContentType {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  cover: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date

  @Column({ nullable: true })
  pdf_author: string

  @Column({ nullable: true, type: 'int' })
  pdf_pages: number

  @Column({ nullable: true, type: 'boolean' })
  pdf_encrypted: boolean

  @Column({ nullable: true })
  image_resolution: string

  @Column({ nullable: true })
  image_aspect_ratio: string

  @Column({ nullable: true, type: 'int' })
  video_duration: number

  @Column({ nullable: true })
  video_resolution: string

  @Column({ nullable: true, type: 'boolean' })
  link_trusted: boolean

  @Column({ nullable: true, type: 'int' })
  link_redirects: number

  @OneToMany(() => Content, (content) => content.contentType)
  contents: Content[]
}
