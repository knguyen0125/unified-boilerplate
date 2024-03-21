import path from 'path';
import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { I18nService } from 'nestjs-i18n';
import { MjmlAdapter } from './mjml.adapter';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [I18nService],
      useFactory: (i18n: I18nService) => ({
        transport: process.env.SMTP_URL,
        template: {
          dir: path.resolve(__dirname, '../../resources/mails'),
          adapter: new MjmlAdapter(
            'handlebars',
            {
              inlineCssEnabled: false,
            },
            { handlebar: { helper: { t: i18n.hbsHelper } } },
          ),
        },
      }),
    }),
  ],
})
export class NestMailerModule {}
