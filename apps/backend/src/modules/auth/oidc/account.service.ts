/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import type { Configuration } from 'oidc-provider';

@Injectable()
export class AccountService {
  findAccount: Configuration['findAccount'] = (ctx, id, token) => {
    return {
      accountId: id,
      async claims(use, scope) {
        console.log(use);
        return {
          sub: id,
        };
      },
    };
  };
  extraTokenClaims: Configuration['extraTokenClaims'] = async (ctx, token) => {
    return undefined;
  };
}
