import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Planet } from "../models/planet.model";
import { PlanetRepository } from "../planet.repository";

export class DynamoDBPlanetRepository implements PlanetRepository {
  private readonly _tableName!: string;
  private readonly _dynamoDB!: DocumentClient;
  constructor() {
    this._tableName = process.env.DYNAMODB_TABLE_NAME!;
    this._dynamoDB = new DocumentClient();
  }
  public static async create(): Promise<PlanetRepository> {
    const repo = new DynamoDBPlanetRepository();
    return Promise.resolve(repo);
  }
  async getPlanets(): Promise<any> {
    try {
      const params: DocumentClient.ScanInput = {
        TableName: this._tableName,
      };
      const { Items } = await this._dynamoDB.scan(params).promise();
      return Items;
    } catch (error) {
      throw error;
    }
  }
  async getPlanet(id: number): Promise<any> {
    try {
      const params: DocumentClient.GetItemInput = {
        TableName: this._tableName,
        Key: {
          id,
        },
      };
      const { Item } = await this._dynamoDB.get(params).promise();
      if (Item === undefined || Item === null) {
        return [];
      }
      return [Item];
    } catch (error) {
      throw error;
    }
  }
  async createPlanet(planet: Planet): Promise<any> {
    try {
      const params: DocumentClient.PutItemInput = {
        TableName: this._tableName,
        Item: {
          ...planet,
        },
      };
      await this._dynamoDB.put(params).promise();
      return planet;
    } catch (error) {
      throw error;
    }
  }
}
