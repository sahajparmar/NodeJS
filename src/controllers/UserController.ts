import User from "../models/User";
import { validationResult } from "express-validator";

export class UserController {
  static signup(req, res, next) {
    const errors = validationResult(req);
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;
    if (!errors.isEmpty()) {
      next(new Error(errors.array()[0].msg));
    }
    const data = {
      email,
      phone,
      password,
      name,
      type,
      status
    };
    let user = new User(data);

    user
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((e) => {
        next(e);
      });
  }

  // static test1(req, res, next) {
  //   console.log("test");
  //   (req as any).msg = "this is test";
  //   next();
  // }
  // static test2(req, res) {
  //   res.send((req as any).msg);
  // }
}
