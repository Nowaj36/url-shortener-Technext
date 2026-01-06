import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { User } from './users/user.entity';
import { Url } from './urls/url-entity';
import { Click } from './analytics/click.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
imports: [
  ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 1800, // 30 min
        limit: 20,
      },
    ]),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Url, Click],
      synchronize: true, // production false
    }),

    AuthModule,
    UsersModule,
    UrlsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
