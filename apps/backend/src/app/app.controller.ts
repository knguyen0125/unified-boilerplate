import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TestDto } from './dto/test.dto';

@ApiTags('app')
@Controller('app')
export class AppController {
  /**
   * Health check
   *
   * @returns Void
   */
  @ApiOperation({ summary: 'Health ' })
  @Get()
  health(@Body() body: TestDto, @Res() res: Response) {
    return res.render('index', { message: 'Hello World!' });
  }
}
