export class UrlAnalyticsResponseDto {
  totalClicks: number;
  dailyClicks: {
    date: string;
    clicks: number;
  }[];
}
