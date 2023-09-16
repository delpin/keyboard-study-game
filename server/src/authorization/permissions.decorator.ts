import { SetMetadata } from '@nestjs/common';
import { PermissionsList } from './permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: PermissionsList[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
