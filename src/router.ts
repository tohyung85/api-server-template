import { Application } from "express";
import UserRoutes from "./modules/users/routes";

export default class Router {
  private authRoutes: UserRoutes;

  constructor() {
    this.authRoutes = new UserRoutes();
  }
  public setupRoutes(app: Application): void {
    app.get("/", (req, res) => {
      res.send("Hello World~!!!");
    });
    app.use("/users", this.authRoutes.routes);
  }
}
