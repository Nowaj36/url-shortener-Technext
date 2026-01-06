import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url-entity';
import { User } from '../users/user.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepo: Repository<Url>,
  ) {}

  private async generateUniqueShortCode(): Promise<string> {
    const MAX_ATTEMPTS = 6;

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const code = nanoid(8);

      const exists = await this.urlRepo.findOne({
        where: { shortCode: code },
      });

      if (!exists) {
        return code;
      }
    }

    throw new InternalServerErrorException(
      'Failed to generate unique short code',
    );
  }

  async createShortUrl(
    originalUrl: string,
    user: User,
  ): Promise<Url> {
    const count = await this.urlRepo.count({
      where: { user: { id: user.id } },
    });

    if (count >= 100) {
      throw new ForbiddenException({
        message:
          'Free plan limit reached. Please upgrade your package to create more URLs.',
        code: 'LIMIT_REACHED',
      });
    }

    const shortCode =
      await this.generateUniqueShortCode();

    const url = this.urlRepo.create({
      originalUrl,
      shortCode,
      user,
    });

    return this.urlRepo.save(url);
  }

  async findUserUrls(userId: number): Promise<Url[]> {
    return this.urlRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteUrl(id: number, userId: number): Promise<void> {
    const url = await this.urlRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.urlRepo.remove(url);
  }

  // 🔐 Used by analytics controller
  async findUrlByIdForUser(
    urlId: number,
    userId: number,
  ): Promise<Url> {
    const url = await this.urlRepo.findOne({
      where: {
        id: urlId,
        user: { id: userId },
      },
    });

    if (!url) {
      throw new ForbiddenException(
        'You do not have access to this URL',
      );
    }

    return url;
  }

  // 🌍 Used by redirect controller
  async findByShortCode(shortCode: string): Promise<Url> {
    const url = await this.urlRepo.findOne({
      where: { shortCode },
    });

    if (!url) {
      throw new NotFoundException('Invalid short URL');
    }

    return url;
  }

  async incrementClicks(urlId: number): Promise<void> {
    await this.urlRepo.increment(
      { id: urlId },
      'clicks',
      1,
    );
  }
}
