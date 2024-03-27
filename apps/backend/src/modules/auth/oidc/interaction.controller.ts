import { Controller, Get, Inject, Param, Req, Res } from '@nestjs/common';
import type Provider from 'oidc-provider';
import { Request, Response } from 'express';

@Controller({
  host: process.env.AUTH_BASE_URL,
  path: '/oidc-interactions',
})
export class InteractionController {
  constructor(
    @Inject('OIDC_PROVIDER')
    private readonly oidcProvider: Provider,
  ) {}

  @Get('/:uid')
  async interaction(
    @Param('uid') uid: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const details = await this.oidcProvider.interactionDetails(
      request,
      response,
    );

    if (details.prompt.name === 'login') {
      // If user is logged in, set the interaction as finished
      if (request.isAuthenticated()) {
        return this.oidcProvider.interactionFinished(
          request,
          response,
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            login: { accountId: request.user.id },
          },
          { mergeWithLastSubmission: false },
        );
      }

      // Otherwise, redirect to login page (with redirection back to here)
      return response.redirect(
        `/login?returnTo=${encodeURIComponent(request.url)}`,
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
        return response.send(
          await this.oidcProvider.interactionFinished(
            request,
            response,
            result,
            { mergeWithLastSubmission: true },
          ),
        );
      }
    }
  }
}
