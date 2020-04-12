export interface IJwtPayload {
  jti?: string;
  iat?: string;
  sub: string;
  username: string;
}
