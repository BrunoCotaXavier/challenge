import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentType } from 'src/content-types/entity'

@Module({
  imports: [TypeOrmModule.forFeature([ContentType])],
  providers: [],
})
export class ContentTypesModule {}
