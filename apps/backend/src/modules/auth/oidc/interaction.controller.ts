import path from 'path';
import { Controller, Get, Inject, Param, Post, Req, Res } from '@nestjs/common';
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

  @Post('/:uid/login')
  async login(
    @Param('uid') uid: string,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.body.username === 'kien' && request.body.password === '123') {
      return this.oidcProvider.interactionFinished(
        request,
        response,
        {
          login: { accountId: 'kien' },
        },
        { mergeWithLastSubmission: false },
      );
    }

    return this.oidcProvider.interactionFinished(
      request,
      response,
      {
        error: 'access_denied',
        error_description: 'Invalid credentials',
      },
      { mergeWithLastSubmission: false },
    );
  }

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
      // Check (using session) if user is logged in

      // If user is logged in, set the interaction as finished

      // Otherwise, redirect to login page (with redirection back to here)
      return response.render(path.join(__dirname, 'views/login.hbs'), {
        action: `/oidc-interactions/${uid}/login`,
      });
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
