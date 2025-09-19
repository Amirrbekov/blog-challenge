import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private readonly redisService: RedisService,
    private jwtService: JwtService,
  ) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const authorizationHeader = req.get('authorization');

    if (!authorizationHeader)
      throw new UnauthorizedException('Authorizatipn header is missing');

    try {
      const token = authorizationHeader.replace('Bearer ', '').trim();
      const payload = this.jwtService.decode(token) as any;

      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid access token');
      }

      const refreshToken = await this.redisService.get(
        `auth:refresh_token:${payload.sub}`,
      );

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      return {
        ...payload,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
