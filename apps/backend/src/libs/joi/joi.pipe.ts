/* eslint-disable @typescript-eslint/ban-ts-comment */ // Unified signatures are harder to read
import { JoiPipe as LibJoiPipe } from 'nestjs-joi';

import { ArgumentMetadata, Injectable, Scope } from '@nestjs/common';

import { I18nContext } from 'nestjs-i18n';
import { FALLBACK_LANGUAGE } from '@/libs/i18n';

@Injectable({ scope: Scope.REQUEST })
export class JoiPipe extends LibJoiPipe {
  private getCurrentLang(): string {
    const i18n = I18nContext.current();

    if (!i18n) {
      return FALLBACK_LANGUAGE;
    }

    const resolvedLanguage = i18n.service.resolveLanguage(i18n.lang);
    if (!i18n.service.getSupportedLanguages().includes(resolvedLanguage)) {
      return FALLBACK_LANGUAGE;
    }

    return resolvedLanguage;
  }

  private getTranslations() {
    const i18n = I18nContext.current();

    if (!i18n) {
      return {};
    }

    const trans = i18n.service.getTranslations();

    const defaultJoitranslations = trans[FALLBACK_LANGUAGE]['joi'];

    // Only get the "joi" translations
    return Object.fromEntries(
      Object.entries(trans).map(([lang, translations]) => [
        lang,
        {
          ...defaultJoitranslations,
          ...translations['joi'],
        },
      ]),
    );
  }

  override transform(payload: unknown, metadata: ArgumentMetadata): unknown {
    // @ts-ignore
    const schema = this.getSchema(metadata);

    if (!schema) {
      // This happens when a metatype was passed by NestJS and it has no
      // validation decoration.
      return payload;
    }

    // @ts-ignore
    const validationOptions = this.pipeOpts.defaultValidationOptions || {
      abortEarly: false,
      allowUnknown: true,
    };

    const translations = this.getTranslations();

    // @ts-ignore
    return JoiPipe.validate(
      payload,
      schema,
      // @ts-ignore
      this.pipeOpts.usePipeValidationException,
      // @ts-ignore
      this.pipeOpts.skipErrorFormatting,
      // It is technically impossible for this to be undefined since it is explicitely assigned
      // with a default value in parseOptions(), so it is almost impossible to test.
      /* istanbul ignore next */
      {
        // @ts-ignore
        ...validationOptions,
        messages: translations,
        errors: {
          language: this.getCurrentLang(),
          ...validationOptions.errors,
        },
      },
      metadata,
    );
  }
}
