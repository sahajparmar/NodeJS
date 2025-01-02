"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const environments_1 = require("../environments/environments");
const jwt = require("jsonwebtoken");
class Jwt {
    static jwtSign(payload, expires_in = "180d") {
        return jwt.sign(payload, (0, environments_1.getEnvironmentVariables)().jwt_secret_key, {
            expiresIn: expires_in, issuer: 'technyks.com'
        });
    }
    static jwtVerify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, (0, environments_1.getEnvironmentVariables)().jwt_secret_key, (err, decoded) => {
                if (err)
                    reject(err);
                else if (!decoded)
                    reject(new Error("user is not authorised."));
                else
                    resolve(decoded);
            });
        });
    }
}
exports.Jwt = Jwt;
