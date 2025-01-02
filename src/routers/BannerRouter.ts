import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/Globalmiddleware";
import { BannerController } from "../controllers/BannerController";
import { BannerValidators } from "../validators/BannerValidatos";
import { Utils } from "../utils/Utils";

class BannerRouter {

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
        "/banners",
        GlobalMiddleware.auth,
        BannerController.getBanners
      );
  }

  postRoutes() {
    this.router.post(
        '/add/create',
        GlobalMiddleware.auth,
        GlobalMiddleware.adminRole,
        new Utils().multer.single('banner'),
        BannerValidators.addBanner(),
        GlobalMiddleware.checkError,
        BannerController.addBanner
      );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new BannerRouter().router;
