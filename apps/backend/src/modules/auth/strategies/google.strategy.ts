import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { InjectModel } from '@nestjs/sequelize';
import WebIdentity from '@/modules/user/models/web-identity.entity';
import User from '@/modules/user/models/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectModel(WebIdentity)
    private readonly webIdentities: typeof WebIdentity,
    @InjectModel(User)
    private readonly users: typeof User,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: ['openid', 'email', 'profile'],
      state: true,
      session: true,
      pkce: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Check if federated identity exists in database using profile.id <- This should not change
    const webIdentity = await this.webIdentities.findOne({
      where: {
        provider: 'google',
        subject: profile.id,
      },
      include: [User],
    });

    if (webIdentity) {
      return webIdentity.user;
    } else {
      // Create a new user
      const user = await this.users.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        // This field is actually a boolean, but the type definition is incorrect
        emailVerified: profile.emails[0].verified as any as boolean,
        password: crypto.randomBytes(20).toString('hex'),
        requirePasswordChange: true,
      });

      // Create the web identity
      await user.$create('webIdentity', {
        provider: 'google',
        subject: profile.id,
      });

      return user;
    }
  }
}
