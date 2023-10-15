import axios from "axios";
import { NotFoundException } from "../../../error/exceptions";

export class SwapiProvider {
  public readonly baseUrl: string = "https://swapi.dev/api";
  constructor() {}
  async getPlanets(page: number = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/planets/?page=${page}`);
      const data = response.data.results;
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException("Page not found");
      }
      throw error;
    }
  }
  async getPlanet(id: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/planets/${id}`);
      const data = response.data;
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException("Planet not found");
      }
      throw error;
    }
  }
}
