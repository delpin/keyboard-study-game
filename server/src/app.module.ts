import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './authorization/authorization.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { GamesModule } from './games/games.module';
import { GameActionModule } from './game-action/game-action.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AuthorizationModule,
    GamesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (headers: { Authorization: string }) => {
            return {
              headers: {
                authorization: headers?.Authorization || '',
              },
            };
          },
        },
      },
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    GameActionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
