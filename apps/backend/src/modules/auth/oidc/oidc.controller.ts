import {
  All,
  Controller,
  Get,
  Inject,
  Param,
  Req,
  Res,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import type Provider from 'oidc-provider';
import { Request, Response } from 'express';
import { ModuleRef } from '@nestjs/core';
import { PATH_METADATA, VERSION_METADATA } from '@nestjs/common/constants';

@Controller({ host: process.env.AUTH_BASE_URL, path: '/oidc' })
export class OidcController {
  private oidcCallback: any;

  constructor(
    @Inject('OIDC_PROVIDER')
    private readonly oidcProvider: Provider,
    private readonly moduleRef: ModuleRef,
  ) {
    this.oidcCallback = this.oidcProvider.callback();
  }

  /** Convert the original URL to the URL that oidc-provider expects. */
  private getUrl(originalUrl: string): string {
    let resultUrl = originalUrl;
    const appConfig = this.moduleRef['container']!.applicationConfig;
    const globalPrefix = appConfig!.getGlobalPrefix();
    const versioning = appConfig!.getVersioning();

    // Remove global prefix
    if (globalPrefix) {
      resultUrl = resultUrl.replace(globalPrefix, '');
    }

    // Remove version
    if (versioning?.type === VersioningType.URI) {
      const version: string | symbol =
        Reflect.getMetadata(VERSION_METADATA, OidcController) ??
        versioning.defaultVersion;

      if (version && version !== VERSION_NEUTRAL) {
        resultUrl = resultUrl.replace(/^\/*[^\/]+/, '');
      }
    }

    // Remove controller path
    const controllerPath = Reflect.getMetadata(PATH_METADATA, OidcController);
    resultUrl = resultUrl.replace(controllerPath, '');

    // Normalize
    return `/${resultUrl}`.replace(/^\/+/, '/');
  }

  @All('/*')
  async oidc(@Req() request: Request, @Res() response: Response) {
    request.url = this.getUrl(request.originalUrl);
    return this.oidcCallback(request, response);
  }

  @Get('/interaction/:uid')
  async interaction(
    @Param('uid') uid: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.oidcProvider.interactionDetails(request, response);
  }
}
