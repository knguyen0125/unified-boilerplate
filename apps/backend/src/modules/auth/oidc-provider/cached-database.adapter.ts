/* eslint-disable @typescript-eslint/no-unused-vars */
import { Adapter, AdapterPayload } from 'oidc-provider';
import Redis from 'ioredis';
import { Model, Sequelize } from 'sequelize-typescript';
import { OidcBaseModel } from '@/modules/auth/oidc-provider/models/oidc.base-entity';

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
  constructor(private readonly model: typeof OidcBaseModel) {}

  async upsert(
    id: string,
    data: AdapterPayload,
    expiresIn: number,
  ): Promise<void> {
    await this.model.upsert({
      id,
      data,
      ...(data.grantId ? { grantId: data.grantId } : undefined),
      ...(data.userCode ? { userCode: data.userCode } : undefined),
      ...(data.uid ? { uid: data.uid } : undefined),
      ...(expiresIn
        ? { expiresAt: new Date(Date.now() + expiresIn * 1000) }
        : undefined),
    });
  }

  async find(id: string): Promise<void | AdapterPayload> {
    const found = await this.model.findOne({ where: { id } });

    if (!found) {
      return undefined;
    }

    return {
      ...found.data,
      ...(found.consumedAt
        ? {
            consumed: true,
          }
        : undefined),
    };
  }

  async findByUserCode(userCode: string): Promise<void | AdapterPayload> {
    const found = await this.model.findOne({ where: { userCode } });

    if (!found) {
      return undefined;
    }

    return {
      ...found.data,
      ...(found.consumedAt
        ? {
            consumed: true,
          }
        : undefined),
    };
  }

  async findByUid(uid: string): Promise<void | AdapterPayload> {
    const found = await this.model.findOne({ where: { uid } });

    if (!found) {
      return undefined;
    }

    return {
      ...found.data,
      ...(found.consumedAt
        ? {
            consumed: true,
          }
        : undefined),
    };
  }

  async consume(id: string): Promise<void> {
    await this.model.update({ consumedAt: new Date() }, { where: { id } });
  }

  async destroy(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async revokeByGrantId(grantId: string): Promise<void> {
    await this.model.destroy({ where: { grantId } });
  }
}
