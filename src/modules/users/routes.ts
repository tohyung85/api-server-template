import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { UserController } from "./controller";
import { UserServiceImp } from "./service";
import { authenticateKeyExchange } from "../../middleware/authenticate-key-exchange";
import { authenticateServerAccess } from "../../middleware/authenticate-server-access";

export default class UserRoutes {
  public routes: Router;
  private userController: UserController;

  constructor() {
    this.setUpControllers();
    this.routes = Router();
    this.configRoutes();
  }

  private setUpControllers(): void {
    const userService = new UserServiceImp();
    this.userController = new UserController(userService);
  }

  private configRoutes(): void {
    this.routes.post(
      "/exchange-token",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          provider: Joi.string().required(),
          providerToken: Joi.string().required(),
        }),
      }),
      authenticateKeyExchange,
      this.userController.exchangeToken
    );

    this.routes.post(
      "/refresh-token",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          token: Joi.string().required(),
        }),
      }),
      this.userController.refreshToken
    );

    this.routes.get("/me", authenticateServerAccess, this.userController.getMe);
  }
}
