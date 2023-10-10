import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "../services/AxiosService.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawHouses() {
    let content = ''
    AppState.houses.forEach(house => content += house.houseCardTemplate)
    setHTML('housesGoHere', content)

}

function _drawHouseForm() {
    // console.log('this ran');
    if (!AppState.account) {
        return
    }
    setHTML('formGoHere', House.houseForm)
}

export class HousesController {
    constructor() {

        // console.log('we are in the house controller not the car one');
        this.getHouses()
        AppState.on('houses', _drawHouses)
        AppState.on('account', _drawHouseForm)
        AppState.on('account', _drawHouses)
    }

    async getHouses() {
        try {
            housesService.getHouses()
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }

    async createHouse(event) {
        try {
            event.preventDefault()
            // console.log('house created');
            const form = event.target
            const houseData = getFormData(form)
            // console.log('house data', houseData);
            await housesService.createHouse(houseData)
            form.reset()
        } catch (error) {
            Pop.error(error)
            console.error(error);
        }
    }


    async deleteHouse(houseId) {
        // console.log('house id', houseId);
        const wantToDelete = await Pop.confirm('are you sure you want to delete')
        if (wantToDelete) {
            // console.log('want to delete');
            housesService.deleteHouse(houseId)
            return
        }
        // console.log('dont want to delete');

    }
}