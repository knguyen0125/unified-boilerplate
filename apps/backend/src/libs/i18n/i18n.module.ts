import path from 'path';
import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nJsonLoader,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { FALLBACK_LANGUAGE } from '@/libs/i18n/constants';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: FALLBACK_LANGUAGE,
      fallbacks: {
        '*': 'en',
      },
      loader: I18nJsonLoader,
      loaderOptions: {
        path: path.join(__dirname, '../../i18n/'),
        watch: true,
        includeSubfolders: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new CookieResolver(['lang']),
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver,
      ],
      viewEngine: 'hbs',
      typesOutputPath: path.join(
        __dirname,
        '../../../src/generated/i18n.generated.ts',
      ),
    }),
  ],
})
export class NestI18NModule {}
