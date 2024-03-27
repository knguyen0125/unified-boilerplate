import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from '@/modules/user/user.service';
import User from '@/modules/user/models/user.entity';
import WebIdentity from '@/modules/user/models/web-identity.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, WebIdentity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}
