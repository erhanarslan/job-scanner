export type AccessTokenPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export type RefreshTokenPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp: number;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = AuthTokens & {
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
};
