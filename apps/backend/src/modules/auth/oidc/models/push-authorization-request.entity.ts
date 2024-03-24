import { Table } from 'sequelize-typescript';
import { OidcBaseModel } from './oidc.base-entity';

@Table
export default class PushAuthorizationRequest extends OidcBaseModel {}
