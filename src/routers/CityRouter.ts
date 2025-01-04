import { Router } from "express";
import { GlobalMiddleware } from "../middlewares/Globalmiddleware";
import { CityController } from "../controllers/CityController";
import { CityValidators } from "../validators/CityValidator";



class CityRouter {

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
        "/cities",
        CityController.getCities
      );
  }

  postRoutes() {
    this.router.post(
        '/create',
       CityValidators.addCity(),
        GlobalMiddleware.checkError,
        CityController.addCity
      );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {}
} 

export default new CityRouter().router;
