import Restaurant from "../models/Restaurant";


export class RestaurantController {

    static async addRestaurant(req, res, next){ 
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
        }
        const city = await new Restaurant(data).save();
        res.send(city);
        }catch(e) {
            next(e);
        }
    }

    static async getRestaurants(req, res, next) {
        try{
            const cities = await Restaurant.find({status: 'active'});
            res.send(cities);
        } catch(e){
            next(e);
        }
    }
}