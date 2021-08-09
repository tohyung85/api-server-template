import jwt from "jsonwebtoken";
import { UserPayload } from "../modules/users/interfaces";

export const authenticateServerAccess = async (req, res, next) => {
  if (!req.headers) return res.status(401).send("Authentication failed");
  const accessToken = req.headers["authorization"];
  if (!accessToken) return res.status(401).send("Authentication failed");

  try {
    const payload = (await jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    )) as UserPayload;

    res.locals.email = payload.email;
    next();
  } catch (error) {
    console.log("error");
    return res.status(401).send("Authentication failed");
  }
};
