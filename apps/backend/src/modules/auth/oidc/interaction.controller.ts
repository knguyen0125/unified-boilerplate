import { Controller, Get, Inject, Param, Req, Res } from '@nestjs/common';
import type Provider from 'oidc-provider';
import { Request, Response } from 'express';

@Controller('/oidc-interactions')
export class InteractionController {
  constructor(
    @Inject('OIDC_PROVIDER')
    private readonly oidcProvider: Provider,
  ) {}

  @Get('/:uid')
  async interaction(
    @Param('uid') uid: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.oidcProvider.interactionDetails(request, response);
  }
}
