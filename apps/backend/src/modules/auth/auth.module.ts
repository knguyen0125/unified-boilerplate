import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OidcModule } from '@/modules/auth/oidc/oidc.module';
import { GoogleStrategy } from '@/modules/auth/strategies/google.strategy';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { UserModule } from '@/modules/user/user.module';
import { NestORMModule } from '@/libs';
import { AuthController } from '@/modules/auth/auth.controller';
import { SessionSerializer } from '@/modules/auth/session.serializer';

@Global()
@Module({
  imports: [
    NestORMModule,
    OidcModule.forRoot(),
    PassportModule.register({
      session: true,
    }),
    UserModule,
  ],
  providers: [GoogleStrategy, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
