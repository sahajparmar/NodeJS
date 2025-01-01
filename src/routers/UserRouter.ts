import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";
import { GlobalMiddleware } from "../middlewares/Globalmiddleware";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();  // read data from server.
    this.postRoutes(); // add some data to server.
    this.patchRoutes(); // partially update an existing resource.
    this.putRoutes(); // update an existing resource or cerate it if doesn't exist.
    this.deleteRoutes(); // delete data from server.
  }
  getRoutes() {
    this.router.get(
      "/send/verification/email",
      GlobalMiddleware.auth,
      UserController.resendVerificationEmail
    );
    this.router.get(
      "/send/reset/password/token",
      UserValidators.checkResetPasswordEmail(),
      GlobalMiddleware.checkError,
      UserController.sendResetPasswordOTP
    );
    this.router.get(
      "/verify/resetPasswordToken",
      UserValidators.verifyResetPasswordToken(),
      GlobalMiddleware.checkError,
      UserController.verifyResetPasswordToken
    );
    this.router.get("/profile", GlobalMiddleware.auth, UserController.profile);
  }

  postRoutes() {
    this.router.post(
      "/signup",
      UserValidators.signup(),
      GlobalMiddleware.checkError,
      UserController.signup
    );
    this.router.post(
      "/login",
      UserValidators.login(),
      GlobalMiddleware.checkError,
      UserController.login
    );
  }

  patchRoutes() {
    this.router.patch(
      "/verify/emailToken",
      GlobalMiddleware.auth,
      UserValidators.verifyUserEmailToken(),
      GlobalMiddleware.checkError,
      UserController.verifyUserEmailToken
    );
    this.router.patch(
      "/reset/password",
      UserValidators.resetPassword(),
      GlobalMiddleware.checkError,
      UserController.resetPassword
    );
    this.router.patch(
      "/update/phone",
      GlobalMiddleware.auth,
      UserValidators.verifyPhoneNumber(),
      GlobalMiddleware.checkError,
      UserController.updatePhoneNumber
    );
    this.router.patch(
      "/update/profile",
      GlobalMiddleware.auth,
      UserValidators.verifyUserProfile(),
      GlobalMiddleware.checkError,
      UserController.updateUserProfile
    );
  }

  putRoutes() {}

  deleteRoutes() {}
}

export default new UserRouter().router;
