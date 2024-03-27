import path from 'path';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';
import { AuthenticatedGuard } from '@/modules/auth/guards/authenticated.guard';
import { GoogleAuthGuard } from '@/modules/auth/guards/google-auth.guard';

@ApiTags('authentication')
@Controller({ host: process.env.AUTH_BASE_URL, path: '/' })
export class AuthController {
  @ApiOperation({
    summary: 'Render login page',
    description: 'Render the login page',
  })
  @Get('/login')
  login(@Req() req: Request, @Res() res: Response) {
    if (req.isAuthenticated()) {
      return res.redirect('/profile');
    }

    return res.render(path.resolve(__dirname, 'views/login.hbs'));
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginWithCredentials(@Res() res: Response) {
    return res.redirect('/profile');
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/auth/google')
  loginWithGoogle() {
    // This is intentionally empty. The Google strategy will handle the redirect.
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/auth/google/callback')
  loginWithGoogleCallback(@Res() res: Response) {
    return res.redirect('/profile');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(() => res.redirect('/login'));
  }
}
