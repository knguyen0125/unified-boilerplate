import { Body, Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TestDto } from './dto/test.dto';

@ApiTags('app')
@Controller('app')
export class AppController {
  /**
   * Health check
   *
   * @remarks
   * This is a health check endpoint in a more detailed description
   * @deprecated
   */
  @Get()
  health(@Body() body: TestDto, @Res() res: Response) {
    return res.render('index', { message: 'Hello World!' });
  }
}
