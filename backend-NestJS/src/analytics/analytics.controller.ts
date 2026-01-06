import {
  Inject,
  forwardRef,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { UrlsService } from '../urls/urls.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import type { RequestWithUser } from '../common/types/request-with-user.type';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    @Inject(forwardRef(() => UrlsService))
    private readonly urlsService: UrlsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('urls/:id')
  async getUrlAnalytics(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    const url =
      await this.urlsService.findUrlByIdForUser(
        Number(id),
        req.user.sub,
      );

    return this.analyticsService.getUrlAnalytics(
      url
    );
  }
}
