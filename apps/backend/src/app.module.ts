import { Module } from '@nestjs/common';
import {
  NestConfigModule,
  NestLoggerModule,
  NestORMModule,
  NestRabbitMQModule,
  NestRedisModule,
  NestScheduleModule,
} from '@/libs';

@Module({
  imports: [
    NestConfigModule,
    NestLoggerModule,
    NestORMModule,
    NestRedisModule,
    NestRabbitMQModule,
    NestScheduleModule,
  ],
})
export class AppModule {}
