import { Column, DataType, Model } from 'sequelize-typescript';

export class OidcBaseModel extends Model {
  @Column({
    type: DataType.STRING(65535),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.JSONB,
  })
  data: Record<string, any>;

  @Column({
    type: DataType.DATE,
  })
  expiresAt: Date;

  @Column({
    type: DataType.DATE,
  })
  consumedAt: Date;
}
