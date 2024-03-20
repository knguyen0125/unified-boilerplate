import { JoiSchema } from 'nestjs-joi';
import Joi from 'joi';
import { BaseDto } from '@/libs/dtos/base.dto';

export class CreateUserDto extends BaseDto {
  @JoiSchema(
    Joi.string()
      .min(10)
      .email()
      .required()
      .description('Email')
      .example('kien.nguyen@google.com'),
  )
  email: string;
}
