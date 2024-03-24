import { Column, DataType, DefaultScope, Model } from 'sequelize-typescript';
import { Op } from 'sequelize';

@DefaultScope(() => ({
  where: {
    // Don't return expired items
    expiresAt: {
      [Op.gt]: new Date().toISOString(),
    },
  },
}))
export class OidcBaseModel extends Model {
  @Column({
    type: DataType.STRING,
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
