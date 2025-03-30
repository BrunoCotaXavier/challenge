import { Field, ObjectType } from '@nestjs/graphql'
import { ProvisionDto } from 'src/content/dto'

@ObjectType()
export class CompanyDto {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  users: string

  @Field(() => [ProvisionDto], { nullable: true })
  contents: ProvisionDto[]
}
