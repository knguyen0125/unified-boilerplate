import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from '@/modules/user/user.service';
import User from '@/entities/user.entity';
import WebIdentity from '@/entities/web-identity.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, WebIdentity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}
