import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

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
  /* eslint-disable import/no-unresolved,@typescript-eslint/ban-ts-comment */
  // @ts-expect-error
  await import('./metadata')
    .then(async (metadata) => {
      await SwaggerModule.loadPluginMetadata(metadata.default);
    })
    .catch((e) => {
      console.error('Error loading metadata', e);
    });
  /* eslint-enable import/no-unresolved,@typescript-eslint/ban-ts-comment */

  // await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
