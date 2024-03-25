import { Table } from 'sequelize-typescript';
import { OidcBaseModel } from './oidc.base-entity';

/**
 * Grant represents privileges granted by a resource owner to a client
 * application.
 */
@Table
export default class Grant extends OidcBaseModel {}
