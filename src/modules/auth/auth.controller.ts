import {
  Controller, Post, Response, Request, Body, HttpStatus, UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from '../user/dto/signUp.dto';
import { LoginDto } from '../user/dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  public async register(@Response() res, @Body() createUserDto: SignUpDto) {
    const result = await this.authService.register(createUserDto);
    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req, @Body() login: LoginDto) {
    console.log('login ROUTE  req.user = ', req.user);
    // const token = await this.authService.login(login);
    // if (token) return token;
    return await this.authService.login(login);
    // return res.status(HttpStatus.OK).json(token);
  }
}
