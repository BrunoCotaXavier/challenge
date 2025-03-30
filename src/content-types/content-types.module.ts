import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentType } from 'src/content-types/entity'
import { ContentTypesRepository } from 'src/content-types/repository'
import { ContentTypesResolver } from 'src/content-types/resolver'
import { ContentTypesService } from 'src/content-types/service'
import { UserModule } from 'src/user'

@Module({
  imports: [TypeOrmModule.forFeature([ContentType]), UserModule],
  providers: [ContentTypesService, ContentTypesRepository, ContentTypesResolver],
})
export class ContentTypesModule {}
