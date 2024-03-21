import { Module } from '@nestjs/common';
import {
  NestConfigModule,
  NestLoggerModule,
  NestORMModule,
  NestRabbitMQModule,
  NestRedisModule,
  NestScheduleModule,
} from '@/libs';
import { UserModule } from '@/modules/user/user.module';
import { NestJoiModule } from '@/libs/joi/joi.module';
import { NestI18NModule } from '@/libs/i18n/i18n.module';

@Module({
  imports: [
    NestConfigModule,
    NestLoggerModule,
    NestORMModule,
    NestRedisModule,
    NestRabbitMQModule,
    NestScheduleModule,
    NestJoiModule,
    NestI18NModule,
    UserModule,
  ],
})
export class AppModule {}
