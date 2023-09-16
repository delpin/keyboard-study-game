import { Injectable } from '@nestjs/common';
import { PermissionsList } from 'src/authorization/permissions.enum';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
export type User = {
  id: number;
  username: string;
  password: string;
  permissions: PermissionsList[];
};

@Injectable()
export class UsersService {
  constructor() {
    this.generateUsers();
  }

  private users: User[] = [];

  async generateUsers() {
    if (!!this.users.length) {
      return;
    } else {
      this.users = [
        {
          id: 1,
          username: 'john',
          password: await bcrypt.hash('changeme', 10),
          permissions: [PermissionsList.GET_PROFILE],
        },
      ];
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
