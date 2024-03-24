import { Table } from 'sequelize-typescript';
import { OidcBaseModel } from './oidc.base-entity';

@Table
export default class Interaction extends OidcBaseModel {}
