import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import User from '@/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly users: typeof User,
  ) {}

  async findByEmail(email: string) {
    return this.users.findOne({
      where: {
        email,
      },
    });
  }
}
