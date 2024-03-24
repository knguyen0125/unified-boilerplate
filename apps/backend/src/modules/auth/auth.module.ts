import { Global, Module } from '@nestjs/common';
import { OidcProviderModule } from '@/modules/auth/oidc-provider/oidc-provider.module';

@Global()
@Module({
  imports: [OidcProviderModule],
})
export class AuthModule {}
