export class Planet {
  id: number;
  name: string;
  rotationPeriod: string;
  orbitalPeriod: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surfaceWater: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;

  constructor(
    id: number,
    name: string,
    rotationPeriod: string,
    orbitalPeriod: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    surfaceWater: string,
    population: string,
    residents: string[],
    films: string[],
    url: string,
    created: string,
    edited: string
  ) {
    this.id = id;
    this.name = name;
    this.rotationPeriod = rotationPeriod;
    this.orbitalPeriod = orbitalPeriod;
    this.diameter = diameter;
    this.climate = climate;
    this.gravity = gravity;
    this.terrain = terrain;
    this.surfaceWater = surfaceWater;
    this.population = population;
    this.residents = residents;
    this.films = films;
    this.url = url;
    this.created = created;
    this.edited = edited;
  }
}
