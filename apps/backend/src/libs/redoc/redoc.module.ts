import { resolve, join } from 'path';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { RedocDocument } from '@/libs/redoc/redoc.interface';
import { RedocOptions, schema } from '@/libs/redoc/redoc.validation-schema';
import { basicAuthMiddleware } from '@/libs/redoc/express-basic-auth';

export class RedocModule {
  public static async setup(
    path: string,
    app: INestApplication,
    document: OpenAPIObject,
    options: RedocOptions,
  ): Promise<void> {
    const validatedOptions = schema(document).validate(options).value;
    const redocDocument = this.addVendorExtensions(
      options,
      <RedocDocument>document,
    );

    return await this.setupExpress(
      path,
      <NestExpressApplication>app,
      redocDocument,
      validatedOptions,
    );
  }

  private static async setupExpress(
    path: string,
    app: NestExpressApplication,
    document: RedocDocument,
    options: RedocOptions,
  ): Promise<void> {
    const httpAdapter = app.getHttpAdapter();

    const finalPath = path.charAt(0) !== '/' ? `/${path}` : path;

    const resolvedPath =
      finalPath.slice(-1) !== '/' ? `${finalPath}/` : finalPath;
    const docUrl = resolve(
      resolvedPath,
      `${options.docName || 'swagger'}.json`,
    );

    httpAdapter.get(finalPath, async (req: Request, res: Response) => {
      const sendPage = () => {
        // Content-Security-Policy: worker-src 'self' blob:
        res.setHeader(
          'Content-Security-Policy',
          "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; child-src * 'unsafe-inline' 'unsafe-eval' blob:; worker-src * 'unsafe-inline' 'unsafe-eval' blob:; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
        );
        // whoosh
        res.render(join(__dirname, 'views', 'redoc.hbs'), {
          docUrl,
          ...options,
        });
      };

      if (options.auth && options.auth.enabled) {
        basicAuthMiddleware([
          {
            username: options.auth.user,
            password: options.auth.password,
          },
        ])(req, res, () => {
          sendPage();
        });
      } else {
        sendPage();
      }
    });

    httpAdapter.get(docUrl, (req: Request, res: Response) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    });
  }

  private static addVendorExtensions(
    options: RedocOptions,
    document: RedocDocument,
  ): RedocDocument {
    if (options.logo) {
      document.info['x-logo'] = options.logo;
    }

    if (options.tagGroups) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document['x-tagGroups'] = options.tagGroups;
    }

    return document;
  }
}
