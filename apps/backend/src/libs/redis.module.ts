import { RedisModule } from '@nestjs-modules/ioredis';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL,
      options: {
        // Fail fast if the Redis server is down
        enableOfflineQueue: false,
        // Prevent the app from hanging indefinitely if the Redis server is down
        commandTimeout: parseInt(process.env.REDIS_COMMAND_TIMEOUT) || 5000,
        connectTimeout: parseInt(process.env.REDIS_CONNECT_TIMEOUT) || 5000,
        disconnectTimeout:
          parseInt(process.env.REDIS_DISCONNECT_TIMEOUT) || 1000,
      },
    }),
  ],
  exports: [RedisModule],
})
export class NestRedisModule {}
