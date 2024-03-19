import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @Post()
  health(@Body() body: TestDto) {
    return { body };
  }
}
