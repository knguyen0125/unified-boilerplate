/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import type { Configuration } from 'oidc-provider';

@Injectable()
export class AccountService {
  findAccount: Configuration['findAccount'] = (ctx, id, token) => {
    return {
      accountId: id,
      async claims(use, scope) {
        // These claims are for `use` of `id_token` or `userinfo`
        return {
          sub: id,
        };
      },
    };
  };
  extraTokenClaims: Configuration['extraTokenClaims'] = async (ctx, token) => {
    // Support for impersonation
    if (token.kind === 'AccessToken') {
      // Only "kien" can impersonate
      // TODO: Make this an actual check
      if (token.accountId && token.accountId === 'kien') {
        if (
          token?.claims &&
          token?.claims['access_token'] &&
          token?.claims['access_token']['act_as']
        ) {
          const actAs = token.claims['access_token']['act_as']['value'];
          return {
            act_as: actAs,
          };
        }
      }
    }
    return undefined;
  };
}
