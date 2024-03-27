import Session from './session.entity';
import AccessToken from './access-token.entity';
import AuthorizationCode from './authorization-code.entity';
import RefreshToken from './refresh-token.entity';
import DeviceCode from './device-code.entity';
import ClientCredentials from './client-credentials.entity';
import Client from './client.entity';
import InitialAccessToken from './initial-access-token.entity';
import RegistrationAccessToken from './registration-access-token.entity';
import Interaction from './interaction.entity';
import ReplayDetection from './replay-detection.entity';
import PushAuthorizationRequest from './push-authorization-request.entity';
import Grant from './grant.entity';
import BackchannelAuthenticationRequest from './backchannel-authentication-request.entity';

export const oidcModelMap = {
  Session: Session,
  AccessToken: AccessToken,
  AuthorizationCode: AuthorizationCode,
  RefreshToken: RefreshToken,
  DeviceCode: DeviceCode,
  ClientCredentials: ClientCredentials,
  Client: Client,
  InitialAccessToken: InitialAccessToken,
  RegistrationAccessToken: RegistrationAccessToken,
  Interaction: Interaction,
  ReplayDetection: ReplayDetection,
  PushAuthorizationRequest: PushAuthorizationRequest,
  Grant: Grant,
  BackchannelAuthenticationRequest: BackchannelAuthenticationRequest,
};

export const models = [
  Session,
  AccessToken,
  AuthorizationCode,
  RefreshToken,
  DeviceCode,
  ClientCredentials,
  Client,
  InitialAccessToken,
  RegistrationAccessToken,
  Interaction,
  ReplayDetection,
  PushAuthorizationRequest,
  Grant,
  BackchannelAuthenticationRequest,
];

export {
  Session,
  AccessToken,
  AuthorizationCode,
  RefreshToken,
  DeviceCode,
  ClientCredentials,
  Client,
  InitialAccessToken,
  RegistrationAccessToken,
  Interaction,
  ReplayDetection,
  PushAuthorizationRequest,
  Grant,
  BackchannelAuthenticationRequest,
};
