import {
  I18nContext,
  TranslateOptions,
  Path,
  i18nValidationMessage,
} from 'nestjs-i18n';
import { I18nTranslations } from '@/generated';

export function translate(
  key: Path<I18nTranslations>,
  options: TranslateOptions = {},
) {
  const i18n = I18nContext.current<I18nTranslations>();

  if (i18n) {
    return i18n.translate(key, options);
  }

  return '';
}

export function validationI18nMessage(
  key: Path<I18nTranslations>,
  arguments_?: any,
) {
  return i18nValidationMessage(key, arguments_);
}
