import { Planet } from "./models/planet.model";
import { PlanetRepository } from "./planet.repository";
import { PlanetService } from "./planets.service";
import { SwapiProvider } from "./providers/swapi";

describe("PlanetService", () => {
  let planetService: PlanetService;
  let planetRepository: PlanetRepository;
  let swapiProvider: SwapiProvider;
  let planets: Planet[];

  let translateToPlanet: any;
  let generateId: any;
  beforeEach(() => {
    planetRepository = {
      getPlanets: jest.fn(),
      getPlanet: jest.fn(),
      createPlanet: jest.fn(),
    };
    swapiProvider = {
      baseUrl: "",
      getPlanets: jest.fn(),
      getPlanet: jest.fn(),
    };
    planetService = new PlanetService(planetRepository, swapiProvider);
    translateToPlanet = planetService["_translateToPlanet"];
    generateId = planetService["_generateId"];
    planets = [
      {
        id: 1,
        name: "Tatooine",
        rotationPeriod: "23",
        orbitalPeriod: "304",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        terrain: "desert",
        surfaceWater: "1",
        population: "200000",
        residents: [],
        films: [],
        url: "https://swapi.dev/api/planets/1/",
        created: "2014-12-09T13:50:49.641000Z",
        edited: "2014-12-20T20:58:18.411000Z",
      },
    ];
  });
  it("should be defined", () => {
    expect(planetService).toBeDefined();
  });
  describe("getPlanets", () => {
    it("should return a list of planets", async () => {
      const expected = [
        {
          id: 1,
          nombre: "Tatooine",
          periodo_rotacion: "23",
          periodo_orbital: "304",
          diametro: "10465",
          clima: "arid",
          gravedad: "1 standard",
          terreno: "desert",
          superficie_agua: "1",
          poblacion: "200000",
          residentes: [],
          peliculas: [],
          url: "https://swapi.dev/api/planets/1/",
          creado: "2014-12-09T13:50:49.641000Z",
          editado: "2014-12-20T20:58:18.411000Z",
        },
      ];
      jest
        .spyOn(planetRepository, "getPlanets")
        .mockImplementation(async () => planets);
      const result = await planetService.getPlanets();
      expect(result).toEqual(expected);
    });
    it("should return an empty list if there are no planets", async () => {
      jest
        .spyOn(planetRepository, "getPlanets")
        .mockImplementation(async () => []);
      const result = await planetService.getPlanets();
      expect(result).toEqual([]);
    });
    it("should return an exception if there is an error", async () => {
      jest
        .spyOn(planetRepository, "getPlanets")
        .mockImplementation(async () => {
          throw new Error("Error");
        });
      await expect(planetService.getPlanets()).rejects.toThrowError();
    });
  });
  describe("getPlanet", () => {
    it("should return a planet", async () => {
      const expected = {
        id: 1,
        nombre: "Tatooine",
        periodo_rotacion: "23",
        periodo_orbital: "304",
        diametro: "10465",
        clima: "arid",
        gravedad: "1 standard",
        terreno: "desert",
        superficie_agua: "1",
        poblacion: "200000",
        residentes: [],
        peliculas: [],
        url: "https://swapi.dev/api/planets/1/",
        creado: "2014-12-09T13:50:49.641000Z",
        editado: "2014-12-20T20:58:18.411000Z",
      };
      jest
        .spyOn(planetRepository, "getPlanet")
        .mockImplementation(async () => planets[0]);
      const result = await planetService.getPlanet(1);
      expect(result).toEqual(expected);
    });
    it("should return an exception if there is an error", async () => {
      jest.spyOn(planetRepository, "getPlanet").mockImplementation(async () => {
        throw new Error("Error");
      });
      await expect(planetService.getPlanet(1)).rejects.toThrowError();
    });
  });
  describe("createPlanet", () => {
    it("should return a planet", async () => {
      const expected = {
        id: 1,
        nombre: "Tatooine",
        periodo_rotacion: "23",
        periodo_orbital: "304",
        diametro: "10465",
        clima: "arid",
        gravedad: "1 standard",
        terreno: "desert",
        superficie_agua: "1",
        poblacion: "200000",
        residentes: [],
        peliculas: [],
        url: "https://swapi.dev/api/planets/1/",
        creado: "2014-12-09T13:50:49.641000Z",
        editado: "2014-12-20T20:58:18.411000Z",
      };
      jest
        .spyOn(planetRepository, "createPlanet")
        .mockImplementation(async () => planets[0]);
      const result = await planetService.createPlanet({
        nombre: "Tatooine",
        periodo_rotacion: "23",
        periodo_orbital: "304",
        diametro: "10465",
        clima: "arid",
        gravedad: "1 standard",
        terreno: "desert",
        superficie_agua: "1",
        poblacion: "200000",
        residentes: [],
        peliculas: [],
        url: "https://swapi.dev/api/planets/1/",
      });
      expect(result).toEqual(expected);
    });
    it("should return an exception if there is an error", async () => {
      jest
        .spyOn(planetRepository, "createPlanet")
        .mockImplementation(async () => {
          throw new Error("Error");
        });
      await expect(
        planetService.createPlanet({
          nombre: "Tatooine",
          periodo_rotacion: "23",
          periodo_orbital: "304",
          diametro: "10465",
          clima: "arid",
          gravedad: "1 standard",
          terreno: "desert",
          superficie_agua: "1",
          poblacion: "200000",
          residentes: [],
          peliculas: [],
          url: "https://swapi.dev/api/planets/1/",
        })
      ).rejects.toThrowError();
    });
  });
  describe("getPlanetsFromSwapi", () => {
    it("should return a list of planets", async () => {
      const newPlanets = planets.map((planet) => {
        const { id, ...newPlanet } = planet;
        return newPlanet;
      });
      const expected = [
        {
          id: 1,
          nombre: "Tatooine",
          periodo_rotacion: "23",
          periodo_orbital: "304",
          diametro: "10465",
          clima: "arid",
          gravedad: "1 standard",
          terreno: "desert",
          superficie_agua: "1",
          poblacion: "200000",
          residentes: [],
          peliculas: [],
          url: "https://swapi.dev/api/planets/1/",
          creado: "2014-12-09T13:50:49.641000Z",
          editado: "2014-12-20T20:58:18.411000Z",
        },
      ];
      jest
        .spyOn(swapiProvider, "getPlanets")
        .mockImplementation(async () => newPlanets);
      const result = await planetService.getPlanetsFromSwapi(1);
      expect(result).toEqual(expected);
    });
    it("should return an empty list if there are no planets", async () => {
      jest
        .spyOn(swapiProvider, "getPlanets")
        .mockImplementation(async () => []);
      const result = await planetService.getPlanetsFromSwapi(1);
      expect(result).toEqual([]);
    });
    it("should return an exception if there is an error", async () => {
      jest
        .spyOn(planetRepository, "getPlanets")
        .mockImplementation(async () => {
          throw new Error("Error");
        });
      await expect(planetService.getPlanetsFromSwapi(1)).rejects.toThrowError();
    });
  });
  describe("getPlanetFromSwapi", () => {
    it("should return a planet", async () => {
      const expected = {
        id: 1,
        nombre: "Tatooine",
        periodo_rotacion: "23",
        periodo_orbital: "304",
        diametro: "10465",
        clima: "arid",
        gravedad: "1 standard",
        terreno: "desert",
        superficie_agua: "1",
        poblacion: "200000",
        residentes: [],
        peliculas: [],
        url: "https://swapi.dev/api/planets/1/",
        creado: "2014-12-09T13:50:49.641000Z",
        editado: "2014-12-20T20:58:18.411000Z",
      };
      jest
        .spyOn(swapiProvider, "getPlanet")
        .mockImplementation(async () => planets[0]);
      const result = await planetService.getPlanetFromSwapi(1);
      expect(result).toEqual(expected);
    });
    it("should return an exception if there is an error", async () => {
      jest.spyOn(swapiProvider, "getPlanet").mockImplementation(async () => {
        throw new Error("Error");
      });
      await expect(planetService.getPlanetFromSwapi(1)).rejects.toThrowError();
    });
  });
  describe("translateToPlanet", () => {
    it("should return a list of planets", () => {
      const expected = [
        {
          id: 1,
          nombre: "Tatooine",
          periodo_rotacion: "23",
          periodo_orbital: "304",
          diametro: "10465",
          clima: "arid",
          gravedad: "1 standard",
          terreno: "desert",
          superficie_agua: "1",
          poblacion: "200000",
          residentes: [],
          peliculas: [],
          url: "https://swapi.dev/api/planets/1/",
          creado: "2014-12-09T13:50:49.641000Z",
          editado: "2014-12-20T20:58:18.411000Z",
        },
      ];
      const result = translateToPlanet(planets);
      expect(result).toEqual(expected);
    });
  });
  describe("generateId", () => {
    it("should return a number", () => {
      const result = generateId();
      expect(result).toEqual(expect.any(Number));
    });
  });
});
