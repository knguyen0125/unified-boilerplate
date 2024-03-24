import path from 'path';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import consolidate from 'consolidate';
import Handlebars from 'handlebars';
import handlebarsHelpers from 'handlebars-helpers';
import { AppModule } from './app.module';
import { RedocModule } from '@/libs/redoc/redoc.module';
import { I18nJoiExceptionFilter } from '@/libs/joi/i18n-joi.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);

  app.useGlobalFilters(new I18nJoiExceptionFilter(app.get(HttpAdapterHost)));

  // Trust X-Forwarded-* headers
  app.set('trust proxy', true);

  // Enable Nunjucks
  app.engine('hbs', consolidate.handlebars);
  app.setBaseViewsDir(path.join(__dirname, 'resources/views'));
  app.useStaticAssets(path.join(__dirname, 'resources/public'), {
    prefix: '/public/',
  });
  app.setViewEngine('hbs');
  Handlebars.registerHelper(handlebarsHelpers());

  // Enable Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setDescription('Backend')
    .setVersion('1.0')
    .build();

  // await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document);
  await RedocModule.setup('/docs', app, document, {
    auth: {
      enabled: true,
      user: 'admin',
      password: 'admin',
    },
  });

  await app.listen(process.env.PORT || 8080);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
