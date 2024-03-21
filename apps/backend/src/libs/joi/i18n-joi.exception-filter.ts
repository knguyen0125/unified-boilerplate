import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { JoiPipeValidationException } from 'nestjs-joi';
import { HttpAdapterHost } from '@nestjs/core';
import { I18nContext } from 'nestjs-i18n';

@Catch(JoiPipeValidationException)
export class I18nJoiExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: JoiPipeValidationException, host: ArgumentsHost) {
    const i18n = I18nContext.current();
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    httpAdapter.reply(
      ctx.getResponse(),
      {
        exception,
        statusCode: 400,
        message: 'Validation failed',
        details: exception?.joiValidationError?.details?.map((err) => {
          return {
            ...err,
            translatedMessage: i18n.translate(`joi.${err.type}`, {
              args: err.context,
            }),
            path: err.path,
          };
        }),
      },
      400,
    );
  }
}
