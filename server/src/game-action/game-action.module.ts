import { Module } from '@nestjs/common';
import { GameActionService } from './game-action.service';

@Module({
  providers: [GameActionService],
})
export class GameActionModule {}
