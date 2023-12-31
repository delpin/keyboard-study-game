import { Module } from '@nestjs/common';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  controllers: [],
  providers: [GamesService, GamesResolver],
  exports: [GamesService],
})
export class GamesModule {}
