import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database } from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
      cache: true,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class NestConfigModule {}
