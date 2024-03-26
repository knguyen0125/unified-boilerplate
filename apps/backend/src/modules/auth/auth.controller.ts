import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  @Get('/login')
  login() {
    return 'Login page';
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  loginWithCredentials() {}
}
