import User from "../models/User";
import { validationResult } from 'express-validator';

export class UserController {
  static signup(req, res, next) {
    
    const errors = validationResult(req);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      
        // const user = new User({
    //   email,
    //   password,
    // });

    // user
    //   .save()
    //   .then((user) => {
    //     res.send(user);
    //   })
    //   .catch((e) => {
    //     next(e);
    //   });
  }

  static test1(req, res, next) {
    console.log("test");
    (req as any).msg = "this is test";
    next();
  }
  static test2(req, res) {
    res.send((req as any).msg);
  }
}
