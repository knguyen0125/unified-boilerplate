import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JoiPipeModule } from 'nestjs-joi';
import { AppController } from './app/app.controller';
import {
  NestConfigModule,
  NestLoggerModule,
  NestORMModule,
  NestRabbitMQModule,
  NestRedisModule,
  NestScheduleModule,
} from '@/libs';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    NestConfigModule,
    NestLoggerModule,
    NestORMModule,
    NestRedisModule,
    NestRabbitMQModule,
    NestScheduleModule,
    JoiPipeModule.forRoot({}),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
