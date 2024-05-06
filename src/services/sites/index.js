import axios from "axios"

class ApiService {
  default_url= "https://data.paris2024.org/explore/dataset/paris-2024-sites-de-competition/api/"


  async getAllSports() {
    return await axios.get(this.default_url +'explore/v2.1/catalog/datasets/paris-2024-sites-de-competition/records?select=sports&limit=-1' ) 
  }
}