import { UserServiceImp } from "../service";

const userService = new UserServiceImp();

describe("service", () => {
  describe("generateTokens and verifyToken", () => {
    it("Should be able to generateTokens and verify them", async () => {
      const user = {
        email: "testuser@gmail.com",
      };
      const tokens = await userService.generateTokens(user);
      const { accessToken, refreshToken } = tokens;

      const decoded = await userService.verifyToken(accessToken);
      const decodedRefresh = await userService.verifyToken(refreshToken);

      expect(decoded).toMatchObject(user);
      expect(decodedRefresh).toMatchObject(user);
    });
    it("Should return null if no user payload provided", async () => {
      const tokens = await userService.generateTokens(null);
      expect(tokens).toBe(null);
    });
  });
  describe("verifyToken", () => {
    it("Should return null if token is invalid", async () => {
      const randomToken = "randomToken";
      const user = await userService.verifyToken(randomToken);
      expect(user).toBe(null);
    });
  });
  describe("refreshToken", () => {
    it("Should return a new accessToken if a valid refreshToken is given", async () => {
      const user = {
        email: "test@user.com",
      };
      const oldTokens = await userService.generateTokens(user);
      const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } =
        oldTokens;

      await new Promise((r) => setTimeout(r, 1000)); // Simulate a delay.

      const newTokens = await userService.refreshTokens(oldRefreshToken);
      const { accessToken, refreshToken } = newTokens;

      const decoded = await userService.verifyToken(accessToken);
      const decodedRefresh = await userService.verifyToken(refreshToken);

      expect(accessToken).not.toBe(oldAccessToken);
      expect(refreshToken).not.toBe(oldRefreshToken);
      expect(decoded).toMatchObject(user);
      expect(decodedRefresh).toMatchObject(user);
    });
    it("Should not refresh if refreshToken is invalid", async () => {
      const oldRefreshToken = "invalidToken";
      const newTokens = await userService.refreshTokens(oldRefreshToken);
      expect(newTokens).toBe(null);
    });
    it("Should not refresh if refreshToken is already invalidated", async () => {
      const user = {
        email: "test@user.com",
      };
      const oldTokens = await userService.generateTokens(user);
      const { refreshToken: oldRefreshToken } = oldTokens;

      await new Promise((r) => setTimeout(r, 1000)); // Simulate a delay.

      await userService.refreshTokens(oldRefreshToken); // Refresh once

      const newestTokens = await userService.refreshTokens(oldRefreshToken); // Refresh again with same Refresh Token
      expect(newestTokens).toBe(null);
    });
  });
});
