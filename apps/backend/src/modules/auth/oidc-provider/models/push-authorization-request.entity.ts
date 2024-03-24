import { Table } from 'sequelize-typescript';
import { OidcBaseModel } from '@/modules/auth/oidc-provider/models/oidc.base-entity';

@Table
export class PushAuthorizationRequest extends OidcBaseModel {}
