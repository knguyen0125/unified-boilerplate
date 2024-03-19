import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, Max } from 'class-validator';

export class TestDto {
  /** Title */
  @ApiProperty()
  @IsAlpha()
  title: string;

  /** Age */
  @ApiProperty()
  @Max(100)
  age: number;
}
