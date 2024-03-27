import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectModel } from '@nestjs/sequelize';
import User from '@/entities/user.entity';

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
    console.log('local', email, password);
    const user = await this.users.findOne({ where: { email } });

    // Vulnerability: User enumeration
    console.log(user);
    if (!user) {
      return null;
    }

    if (user.validatePassword(password)) {
      console.log('local', user);
      return user;
    }

    return null;
  }
}
