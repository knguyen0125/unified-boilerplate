import { Global, Module } from '@nestjs/common';
import { OidcModule } from '@/modules/auth/oidc/oidc.module';

@Global()
@Module({
  imports: [OidcModule.forRoot()],
})
export class AuthModule {}
