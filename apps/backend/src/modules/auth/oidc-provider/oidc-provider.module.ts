/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Global, Module } from '@nestjs/common';
import { CachedDatabaseAdapter } from '@/modules/auth/oidc-provider/cached-database.adapter';
import { oidcModelMap } from '@/modules/auth/oidc-provider/models';
import { OidcController } from '@/modules/auth/oidc-provider/oidc.controller';
import { OidcInteractionController } from '@/modules/auth/oidc-provider/oidc-interaction.controller';

export type OidcProviderModuleOptions = {
  // Add your options here
};

@Global()
@Module({
  imports: [],
})
export class OidcProviderModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: OidcProviderModule,
      controllers: [OidcController, OidcInteractionController],
      providers: [
        {
          provide: 'OIDC_PROVIDER',
          // inject: [getRedisConnectionToken(), getConnectionToken()],
          useFactory: async () => {
            const Provider = (await import('oidc-provider')).default; // Get around the CJS / ESM

            return new Provider('https://auth.local.gd', {
              adapter: (name) => new CachedDatabaseAdapter(oidcModelMap[name]),
              clients: [
                {
                  client_id: 'foo',
                  client_secret: 'bar',
                  grant_types: ['authorization_code'],
                  redirect_uris: ['https://oauth.pstmn.io/v1/callback'],
                },
              ],
              findAccount: async (ctx, id) => {
                return {
                  accountId: id,
                  async claims() {
                    return {
                      sub: id,
                    };
                  },
                };
              },
              features: {
                clientCredentials: { enabled: true },
                introspection: { enabled: true },
                devInteractions: { enabled: false },
              },
              interactions: {
                url(ctx, interaction) {
                  return `/oidc-interactions/${interaction.uid}`;
                },
              },
            });
          },
        },
      ],
    };
  }
}
