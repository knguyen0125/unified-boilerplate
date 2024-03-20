# API Documentation

We use [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) to automatically generate API documentation for
our backend. The API documentation is located at `https://<backend-url>/docs` and OpenAPI file is located
at `https://<backend-url>/docs/swagger.json`

## DTO API Documentation

We use Joi to validate our DTO. To help making it easier and automatically works with Swagger, extends `BaseDto`
from `@/libs/dtos/base.dto`.

We chose Joi over Zod or Class Validator because Joi itself have ability to define example within the schema, have more NestJS-like Decorator

```ts
import {JoiSchema} from 'nestjs-joi';
import Joi from 'joi';
import {BaseDto} from '@/libs/dtos/base.dto';

// BaseDto contains special directive for @nestjs/swagger
// So that Joi validation are translated to OpenAPI automatically
export class CreateUserDto extends BaseDto {
  @JoiSchema(
    Joi.string()
      .min(10)
      .email()
      .description('Email')
      .example('admin@example.com'),
  )
  email: string;
}
```

## Controller Method API Documentation

We use NestJS CLI Plugin to introspect comment

```ts
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {Body} from "@nestjs/common";
import {CreateUserDto} from "./create-user.dto";

@Controller('/')
class APIController {
  /**
   * <Summary>
   *
   * @remarks
   *   <Description>
   * @deprecated
   */
  @Get()
  // Needed since Swagger will replace the description of 200 / 201
  @ApiOkResponse({description: 'OK', type: CreateUserDto})
  getHello(
    @Body() payload: CreateUserDto
  ) {
  }
}
```
