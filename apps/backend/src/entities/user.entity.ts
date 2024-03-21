import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { translate } from '@/libs/i18n';

@Table
export class User extends Model {
  @Column({
    type: DataType.CHAR(255),
    validate: {
      isEmail: {
        msg: translate('user.email.invalid') as string,
      },
    },
  })
  email: string;

  @Column({
    type: DataType.CHAR(255),
  })
  password: string;

  toJSON() {
    const json = super.toJSON();
    // Make sure that the password is not included in the response
    delete json.password;
    return json;
  }
}
