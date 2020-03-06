import {
  Controller, Get, UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

import { AuthService } from './modules/auth/auth.service';

@Controller('test')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('home')
  getHello(): string {
    console.log('test');

    return this.appService.getHello();
  }
}
