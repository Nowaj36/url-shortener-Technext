import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import type { Request, Response } from 'express';

import { UrlsService } from './urls.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import type { RequestWithUser } from '../common/types/request-with-user.type';

@Controller()
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  // Create short URL
  @UseGuards(AccessTokenGuard, ThrottlerGuard)
  @Throttle({ default: { limit: 110, ttl: 1800 } })
  @Post('urls')
  create(
    @Body() dto: CreateUrlDto,
    @Req() req: RequestWithUser,
  ) {
    return this.urlsService.createShortUrl(
      dto.originalUrl,
      { id: req.user.sub } as any,
    );
  }

  // Dashboard list
  @UseGuards(AccessTokenGuard)
  @Get('urls')
  getUserUrls(@Req() req: RequestWithUser) {
    return this.urlsService.findUserUrls(req.user.sub);
  }

  // Delete
  @UseGuards(AccessTokenGuard, ThrottlerGuard)
  @Throttle({ default: { limit: 30, ttl: 300 } })
  @Delete('urls/:id')
  delete(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.urlsService.deleteUrl(
      Number(id),
      req.user.sub,
    );
  }

  // Public redirect + analytics
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 20, ttl: 60 } })
  @Get(':shortCode')
  async redirect(
    @Param('shortCode') code: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      '';

    const userAgent = req.headers['user-agent'] || 'Unknown-Agent';
    const referer = req.headers['referer'] || 'Direct';

    const url = await this.urlsService.findByShortCode(code);

    await this.urlsService.incrementClicks(url.id);

    await this.analyticsService.trackClick(
      url,
      ip,
      userAgent,
      referer,
    );

    return res.redirect(url.originalUrl);
  }
}
