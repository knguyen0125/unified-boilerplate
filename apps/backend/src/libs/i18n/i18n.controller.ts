import { Controller, Get, Param } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { FALLBACK_LANGUAGE } from '@/libs/i18n';

@Controller('i18n')
export class I18nController {
  constructor(private readonly i18nService: I18nService) {}

  @Get('/:lang')
  async getLocale(@Param('lang') language: string) {
    return this.flattenTranslations(this.getTranslations(language));
  }

  @Get('/:lang/:namespace')
  async getNamespacedLocale(
    @Param('lang') language: string,
    @Param('namespace') namespace: string,
  ) {
    return this.flattenTranslations(this.getTranslations(language)[namespace]);
  }

  // Recursive function to flatten translations, from trans['user']['message'] to trans['user.message']
  private flattenTranslations(translations: Record<string, any>) {
    const result: Record<string, any> = {};
    for (const key in translations) {
      if (typeof translations[key] === 'object') {
        const nestedTranslations = this.flattenTranslations(translations[key]);
        for (const nestedKey in nestedTranslations) {
          result[`${key}.${nestedKey}`] = nestedTranslations[nestedKey];
        }
      } else {
        result[key] = translations[key];
      }
    }
    return result;
  }

  private getTranslations(language: string) {
    const translations = this.i18nService.getTranslations();

    const resolvedLanguage = this.i18nService.resolveLanguage(language);
    const actualLanguage = this.i18nService
      .getSupportedLanguages()
      .includes(resolvedLanguage)
      ? resolvedLanguage
      : FALLBACK_LANGUAGE;

    return {
      ...(translations[FALLBACK_LANGUAGE] as Record<string, any>),
      ...(translations[actualLanguage] as Record<string, any>),
    };
  }
}
