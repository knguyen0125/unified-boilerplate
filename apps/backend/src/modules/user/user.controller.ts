import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Controller('users')
export class UserController {
  /**
   * Sign Up
   *
   * @remarks
   *   This is a sign up endpoint
   * @param payload
   */
  @Post()
  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  createUser(@Body() payload: CreateUserDto) {
    return 'User created';
  }
}
