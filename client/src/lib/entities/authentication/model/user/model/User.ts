import type { PermissionsList } from './PermissionsList';

export interface User {
  username: string;
  permissions: PermissionsList[];
}
