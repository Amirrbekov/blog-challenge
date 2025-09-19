import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types/tokens.type';
import { LoginDto, RegisterDto } from 'src/user/dtos';
import * as argon2 from 'argon2';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signIn(dto: LoginDto): Promise<{ tokens: Tokens }> {
    const user = await this.usersService.findOne(dto.username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, dto.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRt(user.id, tokens.refresh_token);

    return {
      tokens,
    };
  }

  async register(dto: RegisterDto): Promise<{ tokens: Tokens }> {
    if (dto.password !== dto.confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const existingUser = await this.usersService.findOne(dto.username);

    if (existingUser) {
      throw new ConflictException('Username already registered');
    }

    const hashedPassword = await argon2.hash(dto.password);

    const newUser = await this.usersService.create({
      username: dto.username,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.username);

    await this.updateRt(newUser.id, tokens.refresh_token);

    return { tokens };
  }

  async logout(userId: number) {
    await this.redisService.del(`auth:refresh_token:${userId}`);
  }

  async updateRt(userId: number, rt: string) {
    await this.redisService.set(
      `auth:refresh_token:${userId}`,
      rt,
      7 * 24 * 60 * 60,
    );
  }

  async refreshToken(userId: number, oldRefreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const storedRefreshToken = await this.redisService.get(
      `auth:refresh_token:${userId}`,
    );
    if (!storedRefreshToken || oldRefreshToken !== storedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const token = await this.getTokens(user.id, user.username);

    return {
      access_token: token.access_token,
    };
  }

  async getTokens(userId: number, username: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          expiresIn: '1m',
          secret: 'supersecretkey',
        },
      ),
      uuidv4(),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
