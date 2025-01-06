import { validationResult } from "express-validator";
import { Jwt } from "../utils/Jwt";

export class GlobalMiddleware {
  static checkError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    } else {
      next();
    }
  }
  static async auth(req, res, next) {
    const header_auth = req.headers.authorization; //Bearer token
    const token = header_auth ? header_auth.slice(7, header_auth.length) : null; // ?
    try {
      if (!token) {
      req.errorStatus = 401;
      next(new Error("User doesn't exist"));
      const decoded = await Jwt.jwtVerify(token);
      }
      const decoded =await Jwt.jwtVerify(token);
      req.user = decoded;
      // console.log(req.user);
      next();
    } catch (e) {
      req.errorStatus = 401;
      next(new Error("User doesn't exist"));
    }
  }

  static adminRole(req, res, next) {
    const user = req.user;
    if (user.type !== "admin") {
      req.errorstatus = 401;
      next(new Error("you are an Unauthorised User"));
    }
    next();
  }
}
