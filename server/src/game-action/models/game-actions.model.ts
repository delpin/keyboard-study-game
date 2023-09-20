import { Field, ObjectType } from '@nestjs/graphql';

export interface SigleGameAction {
  selectedLetter: string;
  programLetter: string;
  index: number;
  currentSpeed: number;
  positionX: number;
  positionY: number;
  time: number;
}

@ObjectType({ description: 'game actions ' })
export class GameActions {
  @Field(() => String)
  uuid: string;

  @Field(() => Number)
  lastCheckTime: number;

  @Field(() => Object)
  users: {
    [uuid: string]: SigleGameAction[];
  };
}
