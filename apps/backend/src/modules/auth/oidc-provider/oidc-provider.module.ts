/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamicModule, Global, Module } from '@nestjs/common';
import Provider from 'oidc-provider';
import Redis from 'ioredis';
import { Sequelize } from 'sequelize-typescript';
import { CachedDatabaseAdapter } from './cached-database.adapter';

export type OidcProviderModuleOptions = {
  // Add your options here
};

@Global()
@Module({
  imports: [],
})
export class OidcProviderModule {
  static async forRoot(): Promise<DynamicModule> {
    const redis: Redis = undefined;
    const sequelize: Sequelize = undefined;
    const provider = new Provider('http://localhost:3000', {
      adapter: (name) => new CachedDatabaseAdapter(name, redis, sequelize),
    });

    return {
      module: OidcProviderModule,
    };
  }
}
