import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GamePaginationArgs } from './dto/game-pagination.args';
import { Game } from './models/game.model';
import { GamesService } from './games.service';
import { AuthGraphQlGuard } from 'src/auth/guards/auth-grapgql.guard';
import {
  CurrentUser,
  CurrentUserResponse,
} from 'src/users/decorators/user.decorator';

const pubSub = new PubSub();

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(AuthGraphQlGuard)
  @Query(() => Game)
  async game(@Args('uuidGame') uuidGame: string): Promise<Game> {
    const recipe = await this.gamesService.findOneByUuid(uuidGame);
    if (!recipe) {
      throw new NotFoundException(uuidGame);
    }
    return recipe;
  }

  @UseGuards(AuthGraphQlGuard)
  @Query(() => [Game])
  games(@Args() recipesArgs: GamePaginationArgs): Promise<Game[]> {
    return this.gamesService.findAll(recipesArgs);
  }

  @UseGuards(AuthGraphQlGuard)
  @Mutation(() => Game)
  async finishGame(@Args('uuidGame') uuidGame: string): Promise<Game> {
    const game = await this.gamesService.finishGame(uuidGame);
    return game;
  }

  @UseGuards(AuthGraphQlGuard)
  @Mutation(() => Game)
  async addGame(@CurrentUser() { token }: CurrentUserResponse): Promise<Game> {
    const game = await this.gamesService.createGame(token);
    pubSub.publish('gamesCreates', { gamesCreates: game });
    return game;
  }

  @UseGuards(AuthGraphQlGuard)
  @Mutation(() => Boolean)
  async addUserToGame(
    @Args('uuidGame') uuidGame: string,
    @CurrentUser() { token, user }: CurrentUserResponse,
  ): Promise<boolean> {
    const isAdded = await this.gamesService.addUserToGame(uuidGame, token);

    pubSub.publish('userAdded', {
      userAdded: { username: user.username, uuidGame },
    });
    return isAdded;
  }

  @UseGuards(AuthGraphQlGuard)
  @Mutation(() => Boolean)
  async deleteUserFromGame(
    @Args('uuidGame') uuidGame: string,
    @CurrentUser() { token, user }: CurrentUserResponse,
  ) {
    const isRemoved = await this.gamesService.deleteUserFromGame(
      uuidGame,
      token,
    );
    pubSub.publish('userRemoved', {
      userRemoved: { username: user.username, uuidGame },
    });
    return isRemoved;
  }

  @UseGuards(AuthGraphQlGuard)
  @Mutation(() => Boolean)
  async removeGame(@Args('uuidGame') uuidGame: string) {
    const isRemoved = this.gamesService.removeGame(uuidGame);
    pubSub.publish('gamesDeleted', { gamesDeleted: uuidGame });
    return isRemoved;
  }

  @UseGuards(AuthGraphQlGuard)
  @Subscription(() => Game)
  gamesCreates() {
    return pubSub.asyncIterator('gamesCreates');
  }

  @UseGuards(AuthGraphQlGuard)
  @Subscription(() => String)
  gamesDeleted() {
    return pubSub.asyncIterator('gamesDeleted');
  }

  @UseGuards(AuthGraphQlGuard)
  @Subscription(() => Game)
  userAdded() {
    return pubSub.asyncIterator('userAdded');
  }

  @UseGuards(AuthGraphQlGuard)
  @Subscription(() => Game)
  userRemoved() {
    return pubSub.asyncIterator('userRemoved');
  }
}
