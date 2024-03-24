import { Column, DataType, Table } from 'sequelize-typescript';
import { OidcBaseModel } from './oidc.base-entity';

@Table
export default class RefreshToken extends OidcBaseModel {
  @Column({
    type: DataType.STRING,
  })
  grantId: string;
}
