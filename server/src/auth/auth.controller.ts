import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './skip-auth.decorator';
import { Permissions } from 'src/authorization/permissions.decorator';
import { PermissionsList } from 'src/authorization/permissions.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { username: string; password: string }) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  @Permissions(PermissionsList.GET_PROFILE)
  getProfile(@Request() request) {
    return request.user;
  }
}
