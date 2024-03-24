/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseAdapter } from './adapters/database.adapter';
import { oidcModelMap } from './models';
import { OidcController } from './oidc.controller';
import { InteractionController } from './interaction.controller';

export type OidcProviderModuleOptions = {
  // Add your options here
};

@Global()
@Module({
  imports: [],
})
export class OidcModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: OidcModule,
      controllers: [OidcController, InteractionController],
      providers: [
        {
          provide: 'OIDC_PROVIDER',
          useFactory: async () => {
            const Provider = (await import('oidc-provider')).default; // Get around the CJS / ESM

            return new Provider('https://auth.local.gd', {
              adapter: (name) => new DatabaseAdapter(oidcModelMap[name]),
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
