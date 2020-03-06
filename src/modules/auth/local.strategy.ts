import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
// import { ModuleRef } from '@nestjs/core';

import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    // private readonly moduleRef: ModuleRef,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    //   passReqToCallback: true,
    });
    console.log('local strat init');
  }

  private readonly logger = new Logger(AuthService.name);

  async validate(username: string, password: string): Promise<User> {
    console.log('local');
    const user = await this.authService.validateUser(username, password);
    this.logger.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
