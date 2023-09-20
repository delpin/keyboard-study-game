import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../types/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AccessTokenObject } from '../types/access-token.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGraphQlGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req || ctx.getContext();
    const token = this.extractTokenFromHeader(request?.headers);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: AccessTokenObject = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret,
        },
      );

      request['user'] = payload;
      request['token'] = token;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(headers: { authorization: string }) {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
