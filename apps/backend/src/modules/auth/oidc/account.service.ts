/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import type { Configuration } from 'oidc-provider';
import { InjectModel } from '@nestjs/sequelize';
import User from '@/modules/user/models/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User)
    private readonly users: typeof User,
  ) {}
  findAccount: Configuration['findAccount'] = async (ctx, id, token) => {
    let sub = id;
    if (token && token.kind === 'AccessToken') {
      if (token.extra && token.extra['act_as']) {
        sub = token.extra['act_as'] as string;
      }
    }

    const user = await this.users.findOne({ where: { id: sub } });

    console.log(user);

    return {
      accountId: user.id,
      async claims(use, scope) {
        const c = {
          sub,
          given_name: user.firstName,
          family_name: user.lastName,
          email: user.email,
          email_verified: user.emailVerified,
          hi: 'there',
        };

        console.log(c);
        // These claims are for `use` of `id_token` or `userinfo`
        return c;
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
