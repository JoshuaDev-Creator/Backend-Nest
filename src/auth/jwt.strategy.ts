import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
