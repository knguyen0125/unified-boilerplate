import path from 'path';
import { Controller, Get, Post, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';
import { AuthenticatedGuard } from '@/modules/auth/guards/authenticated.guard';
import { GoogleAuthGuard } from '@/modules/auth/guards/google-auth.guard';

@Controller('/')
export class AuthController {
  @Get('/login')
  @Render(path.join(__dirname, 'views/login'))
  login() {
    return {};
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginWithCredentials() {
    return 'Logged in!';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/auth/google')
  loginWithGoogle() {
    return 'Logging in with Google';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/auth/google/callback')
  loginWithGoogleCallback() {
    return 'Logged in with Google!';
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  getProfile(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
