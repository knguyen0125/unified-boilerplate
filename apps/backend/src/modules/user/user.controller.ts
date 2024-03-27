import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { MailerService } from '@nestjs-modules/mailer';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly i18nService: I18nService,
  ) {}
  /**
   * Sign Up
   *
   * @remarks
   * This is a sign up endpoint
   * @param payload
   */
  @Post()
  @ApiCreatedResponse({
    type: CreateUserDto,
  })
  createUser(@Body() payload: CreateUserDto) {
    this.logger.log(payload);
    return 'User created';
  }

  @Get()
  async getUsers() {
    const data = await this.mailerService.sendMail({
      to: 'kien.nguyen@your.rentals',
      from: 'noreply@nestjs.com',
      subject: 'Testing Nest MailerModule',
      template: 'welcome',
      context: {
        code: '123456',
        // !Important - Mailer hbs do NOT know to grab the lang from I18nContext
        i18nLang: I18nContext.current().lang,
      },
    });

    this.i18nService.t('user.email.invalid', {
      lang: I18nContext.current().lang,
      args: {},
    });

    return {
      ...data,
      lang: I18nContext.current().lang,
      f: this.i18nService.t('user.email.invalid', {
        lang: I18nContext.current().lang,
      }),
    };
  }
}
