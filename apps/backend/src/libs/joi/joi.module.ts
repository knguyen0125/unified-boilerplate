import { Global, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JoiPipe } from '@/libs/joi/joi.pipe';

@Global()
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: JoiPipe,
    },
  ],
})
export class NestJoiModule {}
