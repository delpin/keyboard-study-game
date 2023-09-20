import { Injectable } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { GameActions, SigleGameAction } from './models/game-actions.model';

@Injectable()
export class GameActionService {
  constructor(private gamesService: GamesService) {}
  private gamesActions: { [key: string]: GameActions } = {};

  generateSymbol() {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  generateNewAction() {
    return {
      currentSpeed: 0,
      index: 0,
      positionX: 0,
      positionY: 0,
      programLetter: '',
      selectedLetter: '',
      time: Date.now(),
    };
  }

  startGame(gameUuid: string) {
    const game = this.gamesService.findOneByUuid(gameUuid);

    if (!game) {
      return null;
    }

    const newGameActionObject: { [key: string]: GameActions } = {
      [gameUuid]: {
        uuid: gameUuid,
        lastCheckTime: Date.now(),
        users: game.users.reduce(
          (result: { [key: string]: SigleGameAction[] }, user: string) => {
            result[user] = [this.generateNewAction()];
            return result;
          },
          {},
        ),
      },
    };

    this.gamesActions = Object.assign(this.gamesActions, newGameActionObject);
  }

  keyup(gameUuid: string, userToken: string, selectedLetter: string) {
    const gameActions = this.gamesActions[gameUuid];

    if (gameActions) {
      return null;
    }

    const lastAction =
      gameActions.users[userToken][gameActions.users[userToken].length - 1] ||
      null;

    if (lastAction) {
      lastAction.selectedLetter = selectedLetter;
    }

    gameActions.users[userToken] = (gameActions.users[userToken] || []).concat({
      currentSpeed:
        lastAction?.currentSpeed + lastAction?.programLetter
          ? Number(lastAction?.programLetter === selectedLetter)
          : 1,
      index: gameActions.users[userToken]?.length || 1,
      positionX: lastAction?.positionX || 0,
      positionY: lastAction?.positionY || 0,
      programLetter: this.generateSymbol(),
      selectedLetter: selectedLetter,
      time: Date.now(),
    });
  }

  checkNewPosition(gameUuid: string) {
    const gameActions = this.gamesActions[gameUuid];

    if (!gameActions) {
      return false;
    }

    if (gameActions.lastCheckTime > Date.now() - 1000) {
      return false;
    }

    gameActions.lastCheckTime = Date.now();
    for (const userUuid in gameActions.users) {
      const user = gameActions.users[userUuid];
      const lastAction = user[user.length - 1];
      lastAction.positionY = lastAction.positionY + lastAction.currentSpeed;
    }

    return true;
  }

  getByUuid(gameUuid: string) {
    return this.gamesActions[gameUuid] || null;
  }
}
