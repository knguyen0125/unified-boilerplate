/* eslint-disable @typescript-eslint/no-unused-vars */
import { Adapter, AdapterPayload } from 'oidc-provider';
import Redis from 'ioredis';
import { Model, Sequelize } from 'sequelize-typescript';

const grantable = new Set([
  'AccessToken',
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
  'BackchannelAuthenticationRequest',
]);

const consumable = new Set([
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
  'BackchannelAuthenticationRequest',
]);

const models = [
  'Session',
  'AccessToken',
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
  'ClientCredentials',
  'Client',
  'InitialAccessToken',
  'RegistrationAccessToken',
  'Interaction',
  'ReplayDetection',
  'PushedAuthorizationRequest',
  'Grant',
  'BackchannelAuthenticationRequest',
];

/**
 * Cached Database Adapter
 *
 * This adapter is used to provide a write-through
 */
export class CachedDatabaseAdapter implements Adapter {
  constructor(
    private readonly cache: Redis,
    private readonly model: typeof Model,
  ) {}

  upsert(
    id: string,
    payload: AdapterPayload,
    expiresIn: number,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(id: string): Promise<void | AdapterPayload> {
    throw new Error('Method not implemented.');
  }
  findByUserCode(userCode: string): Promise<void | AdapterPayload> {
    throw new Error('Method not implemented.');
  }
  findByUid(uid: string): Promise<void | AdapterPayload> {
    throw new Error('Method not implemented.');
  }
  consume(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  revokeByGrantId(grantId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
