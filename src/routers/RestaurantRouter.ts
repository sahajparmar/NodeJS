import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/Globalmiddleware";
import { RestaurantController } from "../controllers/RestaurantController";
import { RestaurantValidators } from "../validators/RestaurantValidator";
import { Utils } from "../utils/Utils";

class CityRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes(); // read data from server.
    this.postRoutes(); // add some data to server.
    this.patchRoutes(); // partially update an existing resource.
    this.putRoutes(); // update an existing resource or cerate it if doesn't exist.
    this.deleteRoutes(); // delete data from server.
  }
  getRoutes() {
    this.router.get(
      "/nearbyRestaurants",
      GlobalMiddleware.auth, 
      RestaurantValidators.getNearbyRestaurants(),
      GlobalMiddleware.checkError,
      RestaurantController.getNearbyRestaurants
    );

    this.router.get(
      "/searchNearbyRestaurants",
      GlobalMiddleware.auth, 
      RestaurantValidators.searchNearbyRestaurants(),
      GlobalMiddleware.checkError,
      RestaurantController.searchNearbyRestaurants
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleware.auth,
      GlobalMiddleware.adminRole, 
      new Utils().multer.single('restaurantImages'),
      RestaurantValidators.addRestaurant(),
      GlobalMiddleware.checkError,
      RestaurantController.addRestaurant
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
}

export default new CityRouter().router;
