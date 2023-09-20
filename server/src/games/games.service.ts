import { Injectable } from '@nestjs/common';
import { Game } from './models/game.model';
import { GamePaginationArgs } from './dto/game-pagination.args';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GamesService {
  private games: Game[] = [];

  async findAll(recipesArgs: GamePaginationArgs) {
    return this.games.slice(recipesArgs.skip, recipesArgs.take);
  }

  async createGame(token: string) {
    const newGame: Game = {
      id: uuid(),
      uuid: uuid(),
      users: [token],
      isActive: true,
    };

    this.games = this.games.concat(newGame);

    return newGame;
  }

  async finishGame(gameUuid: string) {
    const game = this.games.find((game) => game.uuid === gameUuid);
    if (game) {
      game.isActive = false;
    }
    return game;
  }

  findOneByUuid(uuidGame: string) {
    return this.games.find((game) => game.uuid === uuidGame);
  }

  addUserToGame(uuidGame: string, token: string) {
    const game = this.games.find((game) => game.uuid === uuidGame);

    game.users = game.users.concat(token);

    return true;
  }

  deleteUserFromGame(uuidGame: string, token: string) {
    const game = this.games.find((game) => game.uuid === uuidGame);

    game.users = game.users.filter((user) => user !== token);

    return true;
  }

  removeGame(uuidGame: string) {
    this.games = this.games.filter((game) => game.uuid !== uuidGame);
    return true;
  }
}
