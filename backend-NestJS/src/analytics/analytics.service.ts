import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Click } from './click.entity';
import { Url } from '../urls/url-entity';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Click)
    private readonly clickRepo: Repository<Click>,
  ) {}

  // Track a click event
  async trackClick(
    url: Url,
    ip: string,
    userAgent: string,
    referer: string,
  ): Promise<void> {
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';
    const device = parser.getDevice().type || 'Desktop';

    const click = this.clickRepo.create({
      url,
      ipAddress: ip,
      browser,
      os,
      device,
      referer: referer || 'Direct',
      userAgent,
    });

    await this.clickRepo.save(click);
  }

  // Analytics report
  async getUrlAnalytics(url: Url) {
    const urlId = url.id;

    // Total clicks
    const totalClicks = await this.clickRepo.count({
      where: { url: { id: urlId } },
    });

    // Daily, weekly and monthly breakdown
    const daily = await this.getRawStats(urlId, "DATE_FORMAT(click.clickedAt, '%Y-%m-%d')", 'date');
    const weekly = await this.getRawStats(urlId, "YEARWEEK(click.clickedAt)", 'week');
    const monthly = await this.getRawStats(urlId, "DATE_FORMAT(click.clickedAt, '%Y-%m')", 'month');

    // Top visitors by IP address
    const topIps = await this.clickRepo
      .createQueryBuilder('click')
      .select('click.ipAddress', 'ip')
      .addSelect('COUNT(*)', 'clicks')
      .where('click.urlId = :urlId', { urlId })
      .groupBy('click.ipAddress')
      .orderBy('clicks', 'DESC')
      .limit(10)
      .getRawMany();

    // Source, device and browser insights
    const sources = await this.getInsightStats(urlId, 'click.referer', 'source');
    const devices = await this.getInsightStats(urlId, 'click.device', 'type');
    const browsers = await this.getInsightStats(urlId, 'click.browser', 'name');

    return {
      success: true,
      totalClicks,
      breakdown: {
        daily,
        weekly,
        monthly,
      },
      insights: {
        topVisitors: topIps,
        topSources: sources,
        deviceDistribution: devices,
        browserUsage: browsers,
      },
    };
  }

  // Helper methods for code cleanup
  private async getRawStats(urlId: number, format: string, alias: string) {
    return this.clickRepo
      .createQueryBuilder('click')
      .select(format, alias)
      .addSelect('COUNT(*)', 'clicks')
      .where('click.urlId = :urlId', { urlId })
      .groupBy(alias)
      .orderBy(alias, 'ASC')
      .getRawMany();
  }

 private async getInsightStats(urlId: number, column: string, alias: string) {
  const stats = await this.clickRepo
    .createQueryBuilder('click')
    .select(column, alias)
    .addSelect('COUNT(*)', 'count')
    .where('click.urlId = :urlId', { urlId })
    .groupBy(column)
    .orderBy('count', 'DESC')
    .limit(5)
    .getRawMany();

  // convert nulls to 'Unknown'
  return stats.map(s => ({
    [alias]: s[alias] || 'Unknown',
    count: Number(s.count)
  }));
 }
}