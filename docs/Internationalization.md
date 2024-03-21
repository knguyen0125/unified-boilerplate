# Internationalization

## General information

* All translation files are located in `apps/backend/src/i18n`
* Create a new folder for each language you want to support
* File name are "namespaces"

## Express Render (Handlebars)

```handlebars
<div>{{ t "namespace.key" }}</div>
<div>{{ t "namespace.key_with_args" args }}</div>
```

```ts
class Controller {
  @Get()
  @Render('<template>')
  public index() {
    return {
      args: {
        name: 'John'
      }
    };
  }
}
```

## I18n in CronJobs / RabbitMQ

`nest-i18n` have middleware for HTTP, but CronJobs doesn't have AsyncLocalStorage. Use `I18nService` instead.

```ts
class Controller {
  constructor(private readonly i18nService: I18nService) {
  }

  @RabbitSubscribe({
    exchange: 'exchange',
    routingKey: 'routingKey',
  })
  public index() {
    return this.i18nService.t('namespace.key', { lang: 'en', args: {} })
  }
}
```

## I18n in Emails

`nest-i18n` have middleware to attach "i18nLang" to express render, but that does not affect emails. You'll need to add the language manually.

```ts
class Controller {
  constructor(private readonly mailerService: MailerService) {
  }

  @Get()
  public index() {
    return this.mailerService.sendMail({
      // ... data here
      context: {
        i18nLang: 'en' // Or I18nContext.current().lang if in HTTP context
      }
    })
  }
}
```
