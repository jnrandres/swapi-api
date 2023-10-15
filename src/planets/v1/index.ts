import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import middy from "@middy/core";
import cors from "@middy/http-cors";

import { CreatePlanetDTO } from "./dto/create.planet.dto";
import { PlanetService } from "./planets.service";
import { MysqlPlanetRepository } from "./implementations/mysql-planet.repository";
import { DynamoDBPlanetRepository } from "./implementations/dynamodb-planet.repository";
import { SwapiProvider } from "./providers/swapi";
import { errorMiddleware } from "../../middlewares/error.middleware";

let app: PlanetService;

const _bootstrap = async () => {
  if (app) {
    return app;
  }
  const planetRepository = await DynamoDBPlanetRepository.create();
  const swapiProvider = new SwapiProvider();
  app = new PlanetService(planetRepository, swapiProvider);
  return app;
};

const getPlanets = async (event: APIGatewayProxyEvent) => {
  try {
    const planetService = await _bootstrap();
    const planets = await planetService.getPlanets();
    return {
      statusCode: 200,
      body: JSON.stringify(planets),
    };
  } catch (error) {
    return errorMiddleware(error);
  }
};

const getPlanet = async (event: APIGatewayProxyEvent) => {
  try {
    const { id } = event.pathParameters || {};
    const planetService = await _bootstrap();
    const planet = await planetService.getPlanet(parseInt(id || "0"));
    return {
      statusCode: 200,
      body: JSON.stringify(planet),
    };
  } catch (error: any) {
    return errorMiddleware(error);
  }
};

const createPlanet = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const createPlanetDto = plainToClass(CreatePlanetDTO, body);
    const errors = await validate(createPlanetDto);
    if (errors.length > 0) {
      const errorsWithoutTarget = errors.map((error) => {
        const { target, ...rest } = error;
        return rest;
      });
      return {
        statusCode: 400,
        body: JSON.stringify(errorsWithoutTarget),
      };
    }
    const planetService = await _bootstrap();
    const planet = await planetService.createPlanet(createPlanetDto);
    return {
      statusCode: 201,
      body: JSON.stringify(planet),
    };
  } catch (error) {
    return errorMiddleware(error);
  }
};

const getPlanetsSwapi = async (event: APIGatewayProxyEvent) => {
  try {
    const { page } = event.queryStringParameters || {};
    const planetService = await _bootstrap();
    const planets = await planetService.getPlanetsFromSwapi(
      parseInt(page || "1")
    );
    return {
      statusCode: 200,
      body: JSON.stringify(planets),
    };
  } catch (error) {
    return errorMiddleware(error);
  }
};

const getPlanetSwapi = async (event: APIGatewayProxyEvent) => {
  try {
    const { id } = event.pathParameters || {};
    const planetService = await _bootstrap();
    const planet = await planetService.getPlanetFromSwapi(parseInt(id || "0"));
    return {
      statusCode: 200,
      body: JSON.stringify(planet),
    };
  } catch (error) {
    return errorMiddleware(error);
  }
};

export const getPlanetsHandler: Handler = middy(getPlanets).use(cors());
export const getPlanetHandler: Handler = middy(getPlanet).use(cors());
export const createPlanetHandler: Handler = middy(createPlanet).use(cors());
export const getPlanetsSwapiHandler: Handler = middy(getPlanetsSwapi).use(
  cors()
);
export const getPlanetSwapiHandler: Handler = middy(getPlanetSwapi).use(cors());
