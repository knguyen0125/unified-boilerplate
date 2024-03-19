import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        // Create a default topic exchange
        { name: 'default', type: 'topic' },
      ],

      uri: process.env.RABBITMQ_URL,
      connectionInitOptions: { wait: false },
      // Only register handlers in worker mode
      registerHandlers: process.env.WORKER_MODE === 'true',
    }),
  ],
  exports: [RabbitMQModule],
})
export class NestRabbitMQModule {}
