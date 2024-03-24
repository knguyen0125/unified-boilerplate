/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Global, Module } from '@nestjs/common';
// import Redis from 'ioredis';
// import { Sequelize } from 'sequelize-typescript';
//
// import { getConnectionToken } from '@nestjs/sequelize';
// import { getRedisConnectionToken } from '@nestjs-modules/ioredis';
// import { CachedDatabaseAdapter } from './cached-database.adapter';
// import { oidcModelMap } from '@/modules/auth/oidc-provider/models';

export type OidcProviderModuleOptions = {
  // Add your options here
};

@Global()
@Module({
  imports: [],
})
export class OidcProviderModule {
  static async forRoot(): Promise<DynamicModule> {
    // const importOidcProvider = eval(`import('oidc-provider')`) as Promise<
    //   typeof import('oidc-provider')
    // >;
    console.log('hi');

    return {
      module: OidcProviderModule,
      providers: [
        {
          provide: 'NESTJS_OIDC_PROVIDER',
          // inject: [getRedisConnectionToken(), getConnectionToken()],
          useFactory: async () => {
            const Provider = (await import('oidc-provider')).default; // Get around the CJS / ESM

            console.log('hi mom');

            return new Provider('https://auth.local.gd', {
              // adapter: (name) =>
              //   new CachedDatabaseAdapter(redis, oidcModelMap[name]),
              clients: [
                {
                  client_id: 'foo',
                  client_secret: 'bar',
                  application_type: 'web',
                  grant_types: ['authorization_code'],
                },
              ],
            });
          },
        },
      ],
    };
  }
}
