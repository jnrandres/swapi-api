import { NotFoundException } from "../../error/exceptions";
import { CreatePlanetDTO } from "./dto/create.planet.dto";
import { Planet } from "./models/planet.model";
import { PlanetRepository } from "./planet.repository";
import { SwapiProvider } from "./providers/swapi";

export class PlanetService {
  constructor(
    readonly planetRepository: PlanetRepository,
    readonly swapiProvider: SwapiProvider
  ) {}

  async getPlanet(id: number): Promise<any> {
    const planet = await this.planetRepository.getPlanet(id);
    if (planet === undefined || planet === null || planet.length === 0) {
      throw new NotFoundException("Planet not found");
    }
    const planetTranslated = this._translateToPlanet(planet);
    return planetTranslated[0];
  }

  async getPlanets(): Promise<any> {
    const planets = await this.planetRepository.getPlanets();
    const planetsTranslated = this._translateToPlanet(planets);
    return planetsTranslated;
  }

  async createPlanet(planetDto: CreatePlanetDTO): Promise<any> {
    const {
      nombre,
      periodo_rotacion,
      periodo_orbital,
      diametro,
      clima,
      gravedad,
      terreno,
      superficie_agua,
      poblacion,
      residentes,
      peliculas,
      url,
    } = planetDto;
    const id = this._generateId();
    const planet = new Planet(
      id,
      nombre,
      periodo_rotacion ?? "",
      periodo_orbital ?? "",
      diametro ?? "",
      clima ?? "",
      gravedad ?? "",
      terreno ?? "",
      superficie_agua ?? "",
      poblacion ?? "",
      residentes ?? [],
      peliculas ?? [],
      url ?? "",
      new Date().toISOString(),
      new Date().toISOString()
    );
    const planetCrated = await this.planetRepository.createPlanet(planet);
    const planetTranslated = this._translateToPlanet([planetCrated]);
    return planetTranslated[0];
  }

  async getPlanetsFromSwapi(page: number): Promise<any> {
    const planets = await this.swapiProvider.getPlanets(page);
    const planetsTranslated = this._translateToPlanet(planets);
    return planetsTranslated;
  }

  async getPlanetFromSwapi(id: number): Promise<any> {
    const planet = await this.swapiProvider.getPlanet(id);
    const planetTranslated = this._translateToPlanet([planet]);
    return planetTranslated[0];
  }

  private _generateId(): number {
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 10000);
    return timestamp + randomValue;
  }

  private _translateToPlanet(planets: any[]): any[] {
    const planetsTranslated = planets.map((planet) => {
      return {
        id: planet.id ?? Number(planet.url.split("/")[5]),
        nombre: planet.name,
        periodo_rotacion: planet.rotation_period ?? planet.rotationPeriod,
        periodo_orbital: planet.orbital_period ?? planet.orbitalPeriod,
        diametro: planet.diameter,
        clima: planet.climate,
        gravedad: planet.gravity,
        terreno: planet.terrain,
        superficie_agua: planet.surface_water ?? planet.surfaceWater,
        poblacion: planet.population,
        residentes: planet.residents,
        peliculas: planet.films,
        creado: planet.created,
        editado: planet.edited,
        url: planet.url,
      };
    });
    return planetsTranslated;
  }
}
