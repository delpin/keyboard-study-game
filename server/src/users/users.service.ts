import { Injectable } from '@nestjs/common';
import { PermissionsList } from 'src/authorization/permissions.enum';
import * as bcrypt from 'bcrypt';
import { PaginationParams } from 'src/common/types/pagination-params.type';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenObject } from 'src/auth/types/access-token.interface';

// This should be a real class/interface representing a user entity
export type User = {
  id: number;
  username: string;
  password: string;
  permissions: PermissionsList[];
};

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) {
    this.generateUsers();
  }

  private users: User[] = [];
  private authUsers: string[] = [];

  async getAuthUsers({ limit, offset }: PaginationParams) {
    return this.authUsers.slice(offset, limit).map((jwt) => {
      return this.jwtService.decode(jwt) as AccessTokenObject;
    });
  }

  async getAuthUser({ username }: { username: string }) {
    const user = this.authUsers.find((jwt) => {
      const tokenInfo = this.jwtService.decode(jwt) as AccessTokenObject;

      return tokenInfo.username === username;
    });

    return user ? this.jwtService.decode(user) : null;
  }

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
