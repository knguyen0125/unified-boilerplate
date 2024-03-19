import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Backend')
    .setVersion('1.0')
    .build();

  // Make sure that the metadata file does not block app start up
  await import('./metadata')
    .then(async (metadata) => {
      await SwaggerModule.loadPluginMetadata(metadata.default);
    })
    .catch((e) => {
      console.error('Error loading metadata', e);
    });

  // await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
