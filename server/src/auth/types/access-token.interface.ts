import { PermissionsList } from 'src/authorization/permissions.enum';

export interface AccessTokenObject {
  sub: number;
  username: string;
  permissions: PermissionsList[];
}
