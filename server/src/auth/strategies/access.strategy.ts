import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

type JwtPayload = { sub: number; username: string };

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access-token') {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JwtSecretoOrKey'),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
