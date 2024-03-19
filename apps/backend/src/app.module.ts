import { Module } from '@nestjs/common';
import {
  NestConfigModule,
  NestLoggerModule,
  NestORMModule,
  NestRabbitMQModule,
  NestRedisModule,
  NestScheduleModule,
} from '@/libs';
import { AppController } from './app/app.controller';

@Module({
  imports: [
    NestConfigModule,
    NestLoggerModule,
    NestORMModule,
    NestRedisModule,
    NestRabbitMQModule,
    NestScheduleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
