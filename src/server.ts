import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/environments";
import UserRouter from "./routers/UserRouter";
export class Server {  // create a class


  public app: express.Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handlerErrors();
  }

  setConfigs() {
    this.connectMongoDB();  // conecting MongoDB database
  }

  connectMongoDB() {
    mongoose.connect(getEnvironmentVariables().db_url).then(() => {
      console.log("Connected to mongodb.");
    });
  }

  setRoutes() {
    this.app.use("/api/user/", UserRouter);
  }

  error404Handler(){
    this.app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
            status_code: 404
        });
    });
  }

  handlerErrors(){
    this.app.use((error, req, res, next) => {
        const errorStatus = req.errorStatus || 500;
        res.status(errorStatus).json({
            message: error.message || 'Something went wrong, Please try again',
            status_code: errorStatus
        });
    });
  }
  
}
