import { Global, Module } from '@nestjs/common';
import { JoiPipeModule } from 'nestjs-joi';

@Global()
@Module({
  imports: [
    JoiPipeModule.forRoot({
      pipeOpts: {
        skipErrorFormatting: true,
        usePipeValidationException: true,
      },
    }),
  ],
  providers: [
    // {
    //   provide: JOIPIPE_OPTIONS,
    //   useValue: {
    //     // skipErrorFormatting: true,
    //   },
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: JoiPipe,
    // },
  ],
})
export class NestJoiModule {}
