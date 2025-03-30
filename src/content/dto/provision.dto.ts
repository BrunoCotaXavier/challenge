import { Field, Int, ObjectType } from '@nestjs/graphql'
import { CompanyDto } from 'src/company/dto'
import { ContentTypeDto } from 'src/content-types/dto'

@ObjectType()
export class ProvisionDto {
  @Field(() => String)
  id: string

  @Field(() => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Boolean)
  allow_download: boolean

  @Field(() => Boolean)
  is_embeddable: boolean

  @Field(() => Number)
  bytes: number

  @Field(() => String)
  format: string

  @Field(() => String)
  url: string

  @Field(() => Int)
  total_likes: number

  @Field(() => String)
  type: string

  @Field(() => String, { nullable: true })
  cover?: string

  @Field(() => String)
  company_id: string

  @Field(() => String)
  types_id: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date, { nullable: true })
  updated_at: Date | null

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null

  @Field(() => ContentTypeDto, { nullable: true })
  content_types?: ContentTypeDto

  @Field(() => CompanyDto, { nullable: true })
  companies?: CompanyDto
}
