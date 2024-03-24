import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Column({
    type: DataType.CHAR(255),
    validate: {
      isEmail: true,
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
