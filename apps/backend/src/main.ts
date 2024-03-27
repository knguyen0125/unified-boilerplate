import path from 'path';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import consolidate from 'consolidate';
import Handlebars from 'handlebars';
import handlebarsHelpers from 'handlebars-helpers';
import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
import session from 'express-session';
import RedisStore from 'connect-redis';
import passport from 'passport';
import { AppModule } from './app.module';
import { RedocModule } from '@/libs/redoc/redoc.module';
import { I18nJoiExceptionFilter } from '@/libs/joi/i18n-joi.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
    abortOnError: false,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);

  const cookieSecret = (process.env.COOKIE_SECRET || 'secret').split(',');
  const ioredis = app.get(getRedisConnectionToken(), { strict: false });
  const redisStore = new RedisStore({
    client: ioredis,
    prefix: 'sess:',
  });
  app.use(
    session({
      store: redisStore,
      secret: cookieSecret,
      resave: false,
      saveUninitialized: false,
      name: process.env.SESSION_COOKIE_NAME || 'connect.sid',
      cookie: {
        path: process.env.SESSION_COOKIE_PATH || '/',
        domain: process.env.SESSION_COOKIE_DOMAIN,
        secure: process.env.SESSION_COOKIE_SECURE === 'true',
        httpOnly: process.env.SESSION_COOKIE_HTTP_ONLY === 'true',
        maxAge: process.env.SESSION_COOKIE_MAX_AGE
          ? parseInt(process.env.SESSION_COOKIE_MAX_AGE, 10)
          : null,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

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
