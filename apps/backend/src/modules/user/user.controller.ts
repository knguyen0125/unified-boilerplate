import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
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
}
