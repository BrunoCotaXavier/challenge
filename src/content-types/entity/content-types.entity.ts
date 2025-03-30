import { Content } from 'src/content/entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('content_types')
export class ContentType {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ unique: true })
  name: string

  @OneToMany(() => Content, (content) => content.contentType)
  contents: Content[]
}
