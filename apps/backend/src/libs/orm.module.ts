import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Using sequelize logger causes circular dependency issue :/
        // const sequelizeLogger = new Logger('Sequelize');
        return {
          ...configService.get('database'),
          // logging: sequelizeLogger.log.bind(sequelizeLogger),
          autoLoadModels: true,
          synchronize: true,
          sync: {
            // force: true,
          },
        };
      },
    }),
  ],
  exports: [SequelizeModule],
})
export class NestORMModule {}
