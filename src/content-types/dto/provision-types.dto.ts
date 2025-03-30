import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ContentTypeDto {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  cover?: string

  @Field(() => Date)
  created_at: Date

  @Field(() => Date, { nullable: true })
  updated_at: Date | null

  @Field(() => String, { nullable: true })
  pdf_author?: string

  @Field(() => Int, { nullable: true })
  pdf_pages?: number

  @Field(() => Boolean, { nullable: true })
  pdf_encrypted?: boolean

  @Field(() => String, { nullable: true })
  image_resolution?: string

  @Field(() => String, { nullable: true })
  image_aspect_ratio?: string

  @Field(() => Int, { nullable: true })
  video_duration?: number

  @Field(() => String, { nullable: true })
  video_resolution?: string

  @Field(() => Boolean, { nullable: true })
  link_trusted?: boolean

  @Field(() => Int, { nullable: true })
  link_redirects?: number
}
