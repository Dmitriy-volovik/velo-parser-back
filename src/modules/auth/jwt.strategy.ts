import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
// import { Request } from 'express';
// import { use } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    public readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });

    console.log('JwtStrategy int');
  }

  async validate(payload: any, done: Function) {
    // console.log('validate ', payload);
    // return { userId: payload.sub, username: payload.username };
    const user = await this.authService.validateUserToken(payload);
    if (!user) {
      return done(new UnauthorizedException('123'), false);
    }
    return done(null, user);
  }
}
