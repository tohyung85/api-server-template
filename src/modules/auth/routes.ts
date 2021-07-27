import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AuthController } from "./controller";

export default class AuthRoutes {
  public routes: Router;
  private authController: AuthController;

  constructor() {
    this.setUpControllers();
    this.routes = Router();
    this.configRoutes();
  }

  private setUpControllers(): void {
    this.authController = new AuthController();
  }

  private configRoutes(): void {
    this.routes.get(
      "/",
      celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
        }),
      }),
      this.authController.authenticate
    );
  }
}
