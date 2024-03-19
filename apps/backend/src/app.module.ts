import { Module } from '@nestjs/common';
import { NestLoggerModule } from './libs';
import { NestRedisModule } from './libs';
import { NestRabbitMQModule } from './libs/rabbitmq.module';
import { NestORMModule } from './libs/orm.module';
import { NestConfigModule } from './libs/config/config.module';
import { NestScheduleModule } from './libs/schedule.module';

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
