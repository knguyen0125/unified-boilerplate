import { Global, Module } from '@nestjs/common';
import { ConditionalModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [
    ConditionalModule.registerWhen(
      ScheduleModule.forRoot(),
      (env) => env['SCHEDULER_MODE'] === 'true',
    ),
  ],
})
export class NestScheduleModule {}
