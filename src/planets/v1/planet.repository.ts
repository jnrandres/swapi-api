import { Planet } from "./models/planet.model";

export interface PlanetRepository {
  getPlanets(): Promise<any>;
  getPlanet(id: number): Promise<any>;
  createPlanet(planet: Planet): Promise<any>;
}
