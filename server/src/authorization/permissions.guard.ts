import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsList } from './permissions.enum';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { AccessTokenObject } from 'src/auth/types/access-token.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsList[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions?.length) {
      return true;
    }
    const { user }: { user: AccessTokenObject } = context
      .switchToHttp()
      .getRequest();

    return requiredPermissions.every(
      (permission) => user.permissions?.includes(permission),
    );
  }
}
