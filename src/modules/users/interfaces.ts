export interface UserPayload {
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserService {
  generateTokens: (user: UserPayload) => Promise<Tokens | null>;
  verifyToken: (token: string) => Promise<UserPayload>;
  refreshTokens: (refreshToken: string) => Promise<Tokens>;
}
