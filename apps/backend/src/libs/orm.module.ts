import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const sequelizeLogger = new Logger('Sequelize');
        return {
          ...configService.get('database'),
          logging: sequelizeLogger.log.bind(sequelizeLogger),
        };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class NestORMModule {}
