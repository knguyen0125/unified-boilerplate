import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectModel } from '@nestjs/sequelize';
import User from '@/modules/user/models/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User)
    private readonly users: typeof User,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    });
  }

  async validate(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });

    // Vulnerability: User enumeration
    if (!user) {
      return null;
    }

    if (user.validatePassword(password)) {
      return user;
    }

    return null;
  }
}
