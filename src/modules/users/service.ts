import jwt from "jsonwebtoken";
import { UserPayload, Tokens, UserService } from "./interfaces";

export class UserServiceImp implements UserService {
  private refTokens: Record<string, string>;
  constructor() {
    this.refTokens = {};
  }

  public generateTokens = async (user: UserPayload): Promise<Tokens | null> => {
    if (!user) return null;

    const secret = await getJwtSecret();

    if (!secret) return null;

    try {
      const accessToken = await jwt.sign(user, secret, {
        expiresIn: "5m",
      });
      const refreshToken = await jwt.sign(user, secret, {
        expiresIn: "6h",
      });

      await this.saveRefreshToken(user.email, refreshToken);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log("error generating tokens", error);
      throw error;
    }
  };

  public verifyToken = async (token: string): Promise<UserPayload> => {
    const secret = await getJwtSecret();

    if (!secret) return null;

    try {
      const user = await jwt.verify(token, secret);
      return user as UserPayload;
    } catch (error) {
      console.log("error verifying token", error);

      return null;
    }
  };
  public refreshTokens = async (refreshToken: string): Promise<Tokens> => {
    const secret = await getJwtSecret();

    if (!secret) return null;

    try {
      const payload = (await jwt.verify(refreshToken, secret)) as UserPayload;
      const user = {
        email: payload.email,
      };

      if (
        !user ||
        !this.refTokens[user.email] ||
        this.refTokens[user.email] !== refreshToken
      )
        throw "Invalid refresh";
      const newAccessToken = await jwt.sign(user, secret, {
        expiresIn: "5m",
      });
      const newRefreshToken = await jwt.sign(user, secret, {
        expiresIn: "6h",
      });

      await this.saveRefreshToken(user.email, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      console.log("error refreshing token", error);
      return null;
    }
  };

  private saveRefreshToken = async (
    email,
    refToken: string
  ): Promise<boolean> => {
    this.refTokens[email] = refToken;
    return true;
  };
}

const getJwtSecret = async (): Promise<string> => {
  return process.env.JWT_SECRET;
};
