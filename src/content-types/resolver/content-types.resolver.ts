import { Logger, UseGuards } from '@nestjs/common'
import { Resolver, Args, Context, Query } from '@nestjs/graphql'
import { ContentTypesService } from 'src/content-types/service'
import { ContentTypeDto } from 'src/content-types/dto'
import { AuthGuard } from 'src/user/guard'

@Resolver()
export class ContentTypesResolver {
  private readonly logger = new Logger(ContentTypesResolver.name)

  constructor(private readonly contentTypesService: ContentTypesService) {}

  @UseGuards(AuthGuard)
  @Query(() => ContentTypeDto)
  provisionTypes(
    @Args('content_id') contentId: string,
    @Context('req') req,
  ): Promise<ContentTypeDto> {
    this.logger.log(`Provisioning content=${contentId} to user=${req.user.id}`)
    return this.contentTypesService.provisionTypesOne(contentId)
  }

  @UseGuards(AuthGuard)
  @Query(() => [ContentTypeDto])
  async provisionsTypes() {
    const listProvisions = await this.contentTypesService.provisionsTypes()
    return listProvisions
  }
}
