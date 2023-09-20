import { Module } from '@nestjs/common';
import { GameActionService } from './game-action.service';
import { GamesModule } from 'src/games/games.module';

@Module({
  providers: [GameActionService],
  imports: [GamesModule],
})
export class GameActionModule {}
