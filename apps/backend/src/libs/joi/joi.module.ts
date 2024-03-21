import { Global, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JOIPIPE_OPTIONS } from 'nestjs-joi';
import { JoiPipe } from '@/libs/joi/joi.pipe';

@Global()
@Module({
  providers: [
    {
      provide: JOIPIPE_OPTIONS,
      useValue: {
        // skipErrorFormatting: true,
      },
    },
    {
      provide: APP_PIPE,
      useClass: JoiPipe,
    },
  ],
})
export class NestJoiModule {}
