import path from 'path';
import { Module, OnModuleInit } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  I18nService,
  I18nYamlLoader,
  QueryResolver,
} from 'nestjs-i18n';
import Handlebars from 'handlebars';
import { IntlMessageFormat } from 'intl-messageformat';
import { I18nController } from './i18n.controller';
import { FALLBACK_LANGUAGE } from '@/libs/i18n/constants';

const icuFormatter = (template: string, ...args: any[]) => {
  try {
    return new IntlMessageFormat(template).format(args[0]) as string;
  } catch (e) {
    return template;
  }
};

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: FALLBACK_LANGUAGE,
      loader: I18nYamlLoader,
      loaderOptions: {
        path: path.join(__dirname, '../../i18n/'),
        watch: true,
        includeSubfolders: true,
      },
      formatter: icuFormatter,
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new CookieResolver(['lang']),
        new HeaderResolver(['x-lang']),
        AcceptLanguageResolver,
      ],
      viewEngine: 'hbs',
      typesOutputPath:
        process.env.NODE_ENV === 'production'
          ? undefined
          : path.join(__dirname, '../../../src/generated/i18n.generated.ts'),
    }),
  ],
  controllers: [I18nController],
})
export class NestI18NModule implements OnModuleInit {
  constructor(private readonly i18n: I18nService) {}
  async onModuleInit() {
    await this.i18n.refresh();
    Handlebars.registerHelper('t', this.i18n.hbsHelper);
  }
}
