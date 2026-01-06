import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import type { RequestWithUser } from '../common/types/request-with-user.type';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      dto.email,
      dto.password,
    );

    const tokens = await this.authService.login(
      user.id,
      user.email,
    );

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    return { accessToken: tokens.accessToken };
  }

@UseGuards(RefreshTokenGuard, ThrottlerGuard)
@Throttle({ default: { limit: 5, ttl: 60000 } })
@Post('refresh')
async refresh(@Req() req: RequestWithUser) {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token missing');
  }

  const tokens = await this.authService.refreshTokens(
    req.user.sub,
    refreshToken,
  );

  return { accessToken: tokens.accessToken };
}


  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(req.user['sub']);
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
}
