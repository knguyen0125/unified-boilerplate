import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import WebIdentity from '@/modules/user/models/web-identity.entity';

@Table
export default class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(255),
  })
  firstName: string;

  @Column({
    type: DataType.STRING(255),
  })
  lastName: string;

  @Column({
    type: DataType.STRING(255),
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  emailVerified: boolean;

  @Column({
    type: DataType.STRING(255),
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  requirePasswordChange: boolean;

  @HasMany(() => WebIdentity, {
    as: {
      singular: 'WebIdentity',
      plural: 'WebIdentities',
    },
    foreignKey: 'userId',
  })
  webIdentities: WebIdentity[];

  toJSON() {
    const json = super.toJSON();
    // Make sure that the password is not included in the response
    delete json.password;
    return json;
  }

  validatePassword(plaintext: string) {
    // TODO: Implement a secure password validation
    return this.password === plaintext;
  }
}
