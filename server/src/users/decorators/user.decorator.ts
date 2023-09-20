import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AccessTokenObject } from 'src/auth/types/access-token.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

export type CurrentUserResponse = {
  user: AccessTokenObject;
  token: string;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx);
    return {
      user: ctx.getContext().req.user,
      token: ctx.getContext().req.token,
    };
  },
);
