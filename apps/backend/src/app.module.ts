import { Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NestLoggerModule } from './libs';
import { NestRedisModule } from './libs';
import { NestRabbitMQModule } from './libs/rabbitmq.module';
import { NestORMModule } from './libs/orm.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestLoggerModule,
    NestORMModule,
    NestRedisModule,
    NestRabbitMQModule,
    ConditionalModule.registerWhen(
      ScheduleModule.forRoot(),
      (env) => env['SCHEDULER_MODE'] === 'true',
    ),
  ],
})
export class AppModule {}
