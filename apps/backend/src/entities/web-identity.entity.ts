import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import User from '@/entities/user.entity';

@Table
export default class WebIdentity extends Model<WebIdentity> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User, {
    // as: {
    //   singular: 'User',
    //   plural: 'Users',
    // },
    // foreignKey: 'userId',
  })
  user: Awaited<User>;

  /** The provider that the user used to authenticate */
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  provider: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  subject: string;
}
