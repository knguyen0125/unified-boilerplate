import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import Joi from 'joi';
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
  @Render('index')
  getUsers(@Query('plu', new JoiPipe(Joi.number())) plu: number) {
    return { n: 4, pluArgs: { x: plu } };
  }
}
