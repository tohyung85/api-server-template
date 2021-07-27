import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import Router from "./router";
import knex from "./db";

class App {
  public app: express.Application;
  private router: Router;

  constructor() {
    this.app = express();
    this.config();
  }

  private async config(): Promise<void> {
    if (process.env.NODE_ENV !== "test") this.app.use(morgan("short"));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());

    this.configRoutes();
    // this.configObjectionModels();
  }

  private configRoutes(): void {
    this.router = new Router();
    this.router.setupRoutes(this.app);
  }
}

export default new App().app;
