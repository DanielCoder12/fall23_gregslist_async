import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";

class HousesService {

    async getHouses() {
        // console.log('houses got');
        const res = await api.get('api/houses')
        // console.log('houses before', res.data);
        const Houses = res.data.map(r => new House(r))
        // console.log('houses after', Houses);
        AppState.houses = Houses
        // console.log('houses array', AppState.houses);
        // AppState.emit('account')
    }

    async createHouse(houseData) {
        const res = await api.post('api/houses', houseData)
        console.log('new house', res.data);
        const newHouse = new House(res.data)
        console.log('houses before', AppState.houses);
        AppState.houses.push(newHouse)
        AppState.emit('houses')
        console.log('houses after', AppState.houses);

    }

    async deleteHouse(houseId) {
        // console.log('they should only be here if want to delete');
        const res = await api.delete(`api/houses/${houseId}`,)
        const deletedHouse = AppState.houses.findIndex(house => house.id == houseId)
        if (deletedHouse == -1) {
            return
        }
        AppState.houses.splice(deletedHouse, 1)
        AppState.emit('houses')
    }


}
export const housesService = new HousesService()