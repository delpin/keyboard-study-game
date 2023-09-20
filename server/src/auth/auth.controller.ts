import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Permissions } from 'src/authorization/permissions.decorator';
import { PermissionsList } from 'src/authorization/permissions.enum';
import { AuthRestGuard } from './guards/auth-rest.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { username: string; password: string }) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthRestGuard)
  @Get('profile')
  @Permissions(PermissionsList.GET_PROFILE)
  getProfile(@Request() request) {
    return request.user;
  }
}
