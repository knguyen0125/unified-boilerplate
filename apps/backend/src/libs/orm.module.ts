import { Global, Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

const sequelizeLogger = new Logger('Sequelize');

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      replication: {
        read: process.env.DATABASE_READ_REPLICA_HOST
          ? [
              {
                host: process.env.DATABASE_READ_REPLICA_HOST,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                port: process.env.DATABASE_READ_REPLICA_PORT
                  ? parseInt(process.env.DATABASE_READ_REPLICA_PORT)
                  : parseInt(process.env.DATABASE_PORT),
                database: process.env.DATABASE_NAME,
              },
            ]
          : [
              {
                host: process.env.DATABASE_HOST,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                port: parseInt(process.env.DATABASE_PORT),
                database: process.env.DATABASE_NAME,
              },
            ],
        write: {
          host: process.env.DATABASE_HOST,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          port: parseInt(process.env.DATABASE_PORT),
          database: process.env.DATABASE_NAME,
        },
      },
      autoLoadModels: true,
      synchronize: false,
      define: {
        underscored: true,
      },
      logging: sequelizeLogger.log.bind(sequelizeLogger),
    }),
  ],
  exports: [SequelizeModule],
})
export class NestORMModule {}
