import * as mysql from "mysql2/promise";
import { Planet } from "../models/planet.model";
import { PlanetRepository } from "../planet.repository";

const SELECT_PLANETS_QUERY = `
  SELECT
    id,
    name,
    rotation_period as rotationPeriod,
    orbital_period as orbitalPeriod,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water as surfaceWater,
    population,
    residents,
    films,
    url,
    created,
    edited
  FROM planets
`;

export class MysqlPlanetRepository implements PlanetRepository {
  private _connection!: mysql.Connection;
  constructor() {}
  public static async create(): Promise<MysqlPlanetRepository> {
    const repo = new MysqlPlanetRepository();
    await repo.initConnection();
    return repo;
  }
  private async initConnection() {
    this._connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
  async getPlanets(): Promise<any> {
    try {
      const [rows] = (await this._connection.query(
        SELECT_PLANETS_QUERY
      )) as any;
      const planets = rows.map((row: any) => {
        return {
          ...row,
          residents: JSON.parse(row.residents),
          films: JSON.parse(row.films),
        };
      });
      return planets;
    } catch (error) {
      throw error;
    }
  }
  async getPlanet(id: number): Promise<any> {
    try {
      const [rows] = (await this._connection.query(
        `${SELECT_PLANETS_QUERY} WHERE id = ?`,
        [id]
      )) as any;
      const planets = rows.map((row: any) => {
        return {
          ...row,
          residents: JSON.parse(row.residents),
          films: JSON.parse(row.films),
        };
      });
      return planets;
    } catch (error) {
      throw error;
    }
  }
  async createPlanet(planet: Planet): Promise<any> {
    const residents = JSON.stringify(planet.residents);
    const films = JSON.stringify(planet.films);
    try {
      await this._connection.query(
        `INSERT INTO planets (
          id, 
          name, 
          rotation_period, 
          orbital_period, 
          diameter,
          climate,
          gravity,
          terrain,
          surface_water,
          population,
          residents,
          films,
          url,
          created,
          edited
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          planet.id,
          planet.name,
          planet.rotationPeriod,
          planet.orbitalPeriod,
          planet.diameter,
          planet.climate,
          planet.gravity,
          planet.terrain,
          planet.surfaceWater,
          planet.population,
          residents,
          films,
          planet.url,
          planet.created,
          planet.edited,
        ]
      );
      return {
        ...planet,
      };
    } catch (error) {
      throw error;
    }
  }
}
