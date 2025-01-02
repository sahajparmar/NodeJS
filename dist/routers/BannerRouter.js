"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Globalmiddleware_1 = require("../middlewares/Globalmiddleware");
const BannerController_1 = require("../controllers/BannerController");
const BannerValidatos_1 = require("../validators/BannerValidatos");
const Utils_1 = require("../utils/Utils");
class BannerRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes(); // read data from server.
        this.postRoutes(); // add some data to server.
        this.patchRoutes(); // partially update an existing resource.
        this.putRoutes(); // update an existing resource or cerate it if doesn't exist.
        this.deleteRoutes(); // delete data from server.
    }
    getRoutes() {
        this.router.get("/banners", Globalmiddleware_1.GlobalMiddleware.auth, BannerController_1.BannerController.getBanners);
    }
    postRoutes() {
        this.router.post('/add/create', Globalmiddleware_1.GlobalMiddleware.auth, Globalmiddleware_1.GlobalMiddleware.adminRole, new Utils_1.Utils().multer.single('banner'), BannerValidatos_1.BannerValidators.addBanner(), Globalmiddleware_1.GlobalMiddleware.checkError, BannerController_1.BannerController.addBanner);
    }
    patchRoutes() { }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new BannerRouter().router;
