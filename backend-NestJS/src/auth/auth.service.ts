import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { hashData, compareHash } from '../config/hash.util';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await hashData(dto.password);

    const user = await this.usersService.create({
      email: dto.email,
      password: hashedPassword,
    });

    return {
    message: 'User registration successful',
    userId: user.id,
    email: user.email,
  };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(userId: number, email: string) {
    const tokens = await this.generateTokens(userId, email);
    await this.saveRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (
      !user ||
      !user.refreshTokenHash ||
      !(await compareHash(refreshToken, user.refreshTokenHash))
    ) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number) {
    await this.usersService.update(userId, {
      refreshTokenHash: undefined,
    });
  }

  private async generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      payload,
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: number, token: string) {
    const hashed = await hashData(token);
    await this.usersService.update(userId, {
      refreshTokenHash: hashed,
    });
  }
}
