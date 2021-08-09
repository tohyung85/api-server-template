import { Request, Response } from "express";
import { UserService } from "./interfaces";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  public getMe = async (req: Request, res: Response) => {
    return res.status(200).send(res.locals.email);
  };
  public exchangeToken = async (req: Request, res: Response) => {
    const { email } = res.locals;
    // TODO: If user is not in database - add to database, if you manage users yourself
    // create access and refreshtoken and send back
    try {
      const tokens = await this.userService.generateTokens({ email });
      return res.status(200).send(tokens);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  public refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
      const tokens = await this.userService.refreshTokens(token);
      return res.status(200).send(tokens);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
