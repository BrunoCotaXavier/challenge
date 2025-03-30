import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ContentTypesRepository } from 'src/content-types/repository'
import { ContentTypeDto } from 'src/content-types/dto'

@Injectable()
export class ContentTypesService {
  private readonly logger = new Logger(ContentTypesService.name)

  constructor(private readonly contentTypesRepository: ContentTypesRepository) {}

  async provisionTypesOne(contentId: string): Promise<ContentTypeDto> {
    let content
    try {
      content = await this.contentTypesRepository.findOne(contentId)
    } catch (error) {
      this.logger.error(`Database error while fetching content: ${error}`)
      throw new NotFoundException(`Database error: ${error}`)
    }
    return content
  }

  async provisionsTypes(): Promise<ContentTypeDto> {
    let content
    try {
      content = await this.contentTypesRepository.findAll()
    } catch (error) {
      this.logger.error(`Database error while fetching content: ${error}`)
      throw new NotFoundException(`Database error: ${error}`)
    }
    return content
  }
}
