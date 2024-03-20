import { JoiSchema } from 'nestjs-joi';
import Joi from 'joi';
import { BaseDto } from '@/libs/dtos/base.dto';

export class TestDto extends BaseDto {
  @JoiSchema(Joi.string().required().description('Title'))
  title: string;

  @JoiSchema(Joi.number().required().description('User age'))
  age: number;
}
