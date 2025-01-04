import { body } from "express-validator";
import User from "../models/User";

export class RestaurantValidators {

  static addRestaurant() {
    return [
      body("name", "Owner Name is required").isString(),
      body("email", "Email is required")
              .isEmail()
              .custom((email, { req }) => {
                return User.findOne({
                  email: email, // type: 'user'
                })
                  .then((user) => {
                    if (user) {
                      // throw new Error("User Already Exists");
                      throw "User Already Exists";
                    } else {
                      return true;
                    }
                  })
                  .catch((e) => {
                    throw new Error(e);
                  });
              }),
      body("phone", "Phone number is required").isString(), 
      body("password", "Password is required")
      .isAlphanumeric()
      .isLength({ min: 8, max: 25 }),

      body("res_name", "Restaurant Name is required").isString(),
      body("short_name", "Restaurant Short Name is required").isString(),
      body("openTime", "Opening time is required").isString(),
      body("closeTime", "Closing time is required").isString(),
      body("price", "Price is required").isNumeric(),
      body("delivery_time", "Delivery time is required").isNumeric(),
      body("status", "Status is required").isString()


    ];
  }
}
