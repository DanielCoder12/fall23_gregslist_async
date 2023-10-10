import { AppState } from "../AppState.js"

export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator
    }

    get houseCardTemplate() {
        return `
        <div class="col-4 p-3">
        <div class="bg-white rounded d-flex">
          <img class="rounded-start img-fluid house-imgs"
            src="${this.imgUrl}" alt="">
          <div class="p-3">
          <div class="d-flex">
            <p class="fs-3"><img class="img-fluid rounded-circle house-creator"
                src="${this.creator.picture}" alt=""></p>
                <h2 class="fs-3 mb-0 pt-2 ps-2">${this.creator.name}'s house</h2>
                </div>
            <p>${this.price}</p>
            <p>${this.year}, bedrooms: ${this.bedrooms}, bathrooms ${this.bathrooms}, levels: ${this.levels}</p>
            <p>${this.description}</p>
            ${this.deleteButton}
          </div>
        </div>
      </div>
        `
    }

    get deleteButton() {
        if (AppState.account?.id == this.creator.id) {
            return `
        <div class="text-end"><button onclick="app.HousesController.deleteHouse('${this.id}')" class="btn btn-danger ">Delete</button></div>
        `
        }
        return ''
    }
    static get houseForm() {
        return `
            <div class="col-12 col-md-8 p-4">
            <form onsubmit="app.HousesController.createHouse(event)">

              <div class="mb-2">
                <label for="bedrooms">Bedrooms</label>
                <input id="bedrooms" type="number" required max="10" name="bedrooms" placeholder="0">
              </div>

              <div class="mb-2">
                <label for="bathrooms">Bathrooms</label>
                <input id="bathrooms" type="number" required maxlength="500" name="bathrooms" placeholder="0">
              </div>

              <div class="mb-2">
                <label for="levels">Levels</label>
                <input id="levels" type="number" required max="10" placeholder="2020" name="levels">
              </div>


              <div class="mb-2">
                <label for="imgUrl">Image of House</label>
                <input id="imgUrl" type="url" required maxlength="500" name="imgUrl" placeholder="House ImgUrl...">
              </div>


              <div class="mb-2">
                <label for="price">Price</label>
                <input id="price" type="number" required name="price" min="0" max="1000000" placeholder="0">
              </div>

              <div class="mb-2">
                <label for="year">Year</label>
                <input id="year" type="number" name="year" placeholder="2020">
              </div>



              <div class="mb-2">
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="5" placeholder="Car Description..."
                  maxlength="500"></textarea>
              </div>


              <div>
                <button class="btn btn-success" type="submit">Submit</button>
              </div>
            </form>
          </div>
            `
    }
}



// {
//     "_id": "645d60f381faf24223ae886b",
//     "bedrooms": 3,
//     "bathrooms": 2,
//     "levels": 2,
//     "imgUrl": "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg",
//     "year": 2003,
//     "price": 230000,
//     "description": "Super sick house",
//     "creatorId": "63f7d6202d1cf882287f12e2",
//     "createdAt": "2023-05-11T21:41:07.979Z",
//     "updatedAt": "2023-05-11T21:41:07.979Z",
//     "__v": 0,
//     "creator": {
//       "_id": "63f7d6202d1cf882287f12e2",
//       "name": "Charles Francis Xavier",
//       "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
//       "id": "63f7d6202d1cf882287f12e2"
//     },
//     "id": "645d60f381faf24223ae886b"
//   },