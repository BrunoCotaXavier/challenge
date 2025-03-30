import * as fs from 'fs'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ContentRepository } from 'src/content/repository'
import { ProvisionDto } from 'src/content/dto'

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name)
  private readonly expirationTime = 3600

  constructor(private readonly contentRepository: ContentRepository) {}

  async provision(contentId: string): Promise<ProvisionDto> {
    if (!contentId) {
      this.logger.error(`Invalid Content ID: ${contentId}`)
      throw new UnprocessableEntityException(`Content ID is invalid: ${contentId}`)
    }

    this.logger.log(`Provisioning content for id=${contentId}`)
    let content

    try {
      content = await this.contentRepository.findOne(contentId)
    } catch (error) {
      this.logger.error(`Database error while fetching content: ${error}`)
      throw new NotFoundException(`Database error: ${error}`)
    }

    if (!content) {
      this.logger.warn(`Content not found for id=${contentId}`)
      throw new NotFoundException(`Content not found: ${contentId}`)
    }

    const filePath = content.url
    let bytes = 0

    try {
      bytes = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0
    } catch (error) {
      this.logger.error(`File system error: ${error}`)
    }

    if (!content.type) {
      this.logger.warn(`Missing content type for ID=${contentId}`)
      throw new BadRequestException('Content type is missing')
    }

    const contentsTypes = await this.contentRepository.findAllTypes()
    const items = contentsTypes.find((item) => item.type === content.type)

    if (items) {
      return {
        id: content.id,
        title: content.title,
        cover: content.cover,
        created_at: content.created_at,
        description: content.description,
        total_likes: content.total_likes,
        type: content.type,
        url: this.generateSignedUrl(content.url || ''),
        allow_download: content.allow_download,
        is_embeddable: content.is_embeddable,
        format: content.format,
        bytes,
        types_id: content.types_id,
        company_id: content.company_id,
        deleted_at: content.deleted_at,
        updated_at: content.updated_at,
        content_types: {
          id: content.content_types.id,
          name: content.content_types.name,
          description: content.content_types.description,
          cover: content.content_types.cover,
          created_at: content.content_types.created_at,
          updated_at: content.content_types.updated_at,
          pdf_author: content.content_types.pdf_author,
          pdf_pages: content.content_types.pdf_pages,
          pdf_encrypted: content.content_types.pdf_encrypted,
          image_resolution: content.content_types.image_resolution,
          image_aspect_ratio: content.content_types.image_aspect_ratio,
          video_duration: content.content_types.video_duration,
          video_resolution: content.content_types.video_resolution,
          link_trusted: content.content_types.link_trusted,
          link_redirects: content.content_types.link_redirects,
        },
        companies: {
          id: content.companies.id,
          name: content.companies.name,
          users: content.companies.users,
          contents: content.companies.contents,
        },
      }
    }

    this.logger.warn(`Unsupported content type for ID=${contentId}, type=${content.type}`)
    throw new BadRequestException(`Unsupported content type: ${content.type}`)
  }

  async getAllProvisions() {
    let content
    try {
      content = await this.contentRepository.findAll()
      content.url = this.generateSignedUrl(content.url || '')
    } catch (error) {
      this.logger.error(`Database error while fetching all content: ${error}`)
      throw new NotFoundException(`Database error: ${error}`)
    }
    return content
  }

  private generateSignedUrl(originalUrl: string): string {
    const expires = Math.floor(Date.now() / 1000) + this.expirationTime
    return `${originalUrl}?expires=${expires}&signature=${Math.random().toString(36).substring(7)}`
  }
}
