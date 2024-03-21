import { Body, Controller, Get, Logger, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);
  /**
   * Sign Up
   *
   * @remarks
   * This is a sign up endpoint
   * @param payload
   */
  @Post()
  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  createUser(@Body() payload: CreateUserDto) {
    this.logger.log(payload);
    return 'User created';
  }

  @Get()
  getUsers(@Res() res: Response) {
    return res.render('index', { n: 4 });
  }
}
