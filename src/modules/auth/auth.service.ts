import {
  Injectable, Logger, HttpException, HttpStatus,
} from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

import { TRegistrationStatus, TJwtPayload } from '../../type';
import { UserService } from '../user/user.service';
import { SignUpDto } from '../user/dto/signUp.dto';
import { User } from '../user/user.entity';
import { LoginDto } from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  private readonly logger = new Logger(AuthService.name);

  async register(user: SignUpDto) {
    let status: TRegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.userService.register(user);
    } catch (err) {
      status = { success: false, message: err };
    }
    return status;
  }

  async login(login: LoginDto) {
    const user = await this.userService.findByEmail(login.email);
    if (!user) {
      throw new HttpException(
        'User Not Found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // debug('start getting the token');
    const token = this.createToken(user);
    return token;
  }

  createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      hi: 'hohohoh',
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserToken(payload: TJwtPayload): Promise<any> {
    return await this.userService.findOne(payload.id);
  }

  async validateUser(email: string, userPassword: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await user.comparePassword(userPassword)) {
      this.logger.log('password check success');

      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
