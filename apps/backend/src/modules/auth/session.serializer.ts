/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import User from '@/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectModel(User)
    private readonly users: typeof User,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: Function) {
    const user = await this.users.findOne({ where: { id: userId } });

    if (!user) {
      return done(new Error('User not found'));
    }

    done(null, user);
  }
}
