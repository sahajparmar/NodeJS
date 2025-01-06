import City from "../models/City";
import Banner from "../models/City";

export class CityController {

    static async addCity(req, res, next){ 
        const name = req.body.path;
        const lat = req.body.lat;
        const lng = req.body.lng;
        const status = req.body.status;
        

    try{
        const data = {
            name,
            lat,
            lng,
            status
        };
        const city = await new City(data).save();
        res.send(city);
        }catch(e) {
            next(e);
        }
    }

    static async getCities(req, res, next) {
        try{
            const cities = await City.find({status: 'active'});
            res.send(cities);
        } catch(e){
            next(e);
        }
    }
}