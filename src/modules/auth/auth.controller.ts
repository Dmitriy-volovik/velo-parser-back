import {
  Controller, Post, Request, Body, UseGuards,
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
  public async register(@Body() createUserDto: SignUpDto) {
    const result = await this.authService.register(createUserDto);
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req, @Body() login: LoginDto) {
    return await this.authService.login(login);
  }
}
