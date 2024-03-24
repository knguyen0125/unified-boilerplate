import { Column, DataType, Table } from 'sequelize-typescript';
import { OidcBaseModel } from './oidc.base-entity';

@Table
export default class DeviceCode extends OidcBaseModel {
  @Column({
    type: DataType.STRING,
  })
  grantId: string;

  @Column({
    type: DataType.STRING,
  })
  userCode: string;
}
