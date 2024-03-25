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
    const details = await this.oidcProvider.interactionDetails(
      request,
      response,
    );

    if (details.prompt.name === 'login') {
      return this.oidcProvider.interactionFinished(
        request,
        response,
        { login: { accountId: 'kien' } },
        { mergeWithLastSubmission: false },
      );
    } else if (details.prompt.name === 'consent') {
      const grant = details.grantId
        ? await this.oidcProvider.Grant.find(details.grantId)
        : new this.oidcProvider.Grant({
            accountId: details.session.accountId,
            clientId: details.params.client_id as string,
          });

      if (grant) {
        if (details.prompt.details.missingOIDCScope) {
          grant.addOIDCScope(details.prompt.details.missingOIDCScope as string);
        }

        if (details.prompt.details.missingOIDCClaims) {
          grant.addOIDCClaims(
            details.prompt.details.missingOIDCClaims as string[],
          );
        }
        const grantId = await grant.save();

        const result = { consent: { grantId } };
        return this.oidcProvider.interactionFinished(
          request,
          response,
          result,
          { mergeWithLastSubmission: true },
        );
      }
    }
  }
}
