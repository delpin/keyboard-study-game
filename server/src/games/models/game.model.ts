import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'game ' })
export class Game {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  uuid: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => [String])
  users: string[];
}
