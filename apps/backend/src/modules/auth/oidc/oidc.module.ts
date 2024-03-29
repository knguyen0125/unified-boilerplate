/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseAdapter } from './adapters/database.adapter';
import { models, oidcModelMap } from './models';
import { OidcController } from './oidc.controller';
import { InteractionController } from './interaction.controller';
import { AccountService } from './account.service';

export type OidcProviderModuleOptions = {
  // Add your options here
};

// Avoid transpiling the dynamic import
const dynamicImport = async (module: string) => {
  return await eval(`import('${module}')`);
};

@Global()
@Module({
  imports: [SequelizeModule.forFeature(models)],
  exports: [SequelizeModule],
})
export class OidcModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: OidcModule,
      controllers: [OidcController, InteractionController],
      providers: [
        AccountService,
        {
          provide: 'OIDC_PROVIDER',
          inject: [AccountService],
          useFactory: async (accountService: AccountService) => {
            const Provider = (await dynamicImport('oidc-provider'))
              .default as typeof import('oidc-provider').default;

            const provider = new Provider('https://auth.local.gd', {
              adapter: (name) => new DatabaseAdapter(oidcModelMap[name]),
              clients: [
                {
                  client_id: 'foo',
                  client_secret: 'bar',
                  grant_types: ['authorization_code', 'refresh_token'],
                  redirect_uris: ['https://oauth.pstmn.io/v1/callback'],
                  scope: 'openid email profile offline_access',
                },
              ],
              findAccount: accountService.findAccount.bind(accountService),
              extraTokenClaims:
                accountService.extraTokenClaims.bind(accountService),
              claims: {
                acr: null,
                auth_time: null,
                iss: null,
                openid: ['sub'],
                sid: null,
                address: ['address'],
                email: ['email', 'email_verified'],
                phone: ['phone_number', 'phone_number_verified'],
                profile: [
                  'birthdate',
                  'family_name',
                  'gender',
                  'given_name',
                  'locale',
                  'middle_name',
                  'name',
                  'nickname',
                  'picture',
                  'preferred_username',
                  'profile',
                  'updated_at',
                  'website',
                  'zoneinfo',
                ],
              },
              features: {
                clientCredentials: {
                  enabled: true,
                },
                introspection: {
                  enabled: true,
                },
                devInteractions: {
                  enabled: false,
                },
                revocation: {
                  enabled: true,
                },
                claimsParameter: {
                  enabled: true,
                },
              },
              cookies: {},
              interactions: {
                url(ctx, interaction) {
                  return `/oidc-interactions/${interaction.uid}`;
                },
              },
            });

            provider.proxy = true;

            return provider;
          },
        },
      ],
    };
  }
}
