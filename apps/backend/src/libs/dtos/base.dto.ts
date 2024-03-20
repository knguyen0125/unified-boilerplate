import { getClassSchema } from 'nestjs-joi';
import joiToSwagger from 'joi-to-swagger';

export class BaseDto {
  static _OPENAPI_METADATA_FACTORY() {
    try {
      return joiToSwagger(getClassSchema(this))?.swagger?.properties;
    } catch (e) {
      return {};
    }
  }
}
