import { Request, Response } from "express";

export class AuthController {
  public authenticate = async (req: Request, res: Response) => {
    return res.status(200).send("OK!");
  };
}
