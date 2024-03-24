import { Column, DataType, Table } from 'sequelize-typescript';
import { OidcBaseModel } from '@/modules/auth/oidc-provider/models/oidc.base-entity';

@Table
export class AuthorizationCode extends OidcBaseModel {
  @Column({
    type: DataType.STRING,
  })
  grantId: string;
}
