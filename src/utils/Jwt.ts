import { getEnvironmentVariables } from "../environments/environments";
import * as jwt from "jsonwebtoken";

export class Jwt {

 static jwtSign(payload, expired_In: string = "180d") {
    return jwt.sign(payload, getEnvironmentVariables().jwt_secret_key, {
      expiresIn: expired_In,
    });
  }
  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) reject(err);
          else if (!decoded) reject(new Error("user is not authorised."));
          else resolve(decoded);
        }
      );
    });
  }
}
