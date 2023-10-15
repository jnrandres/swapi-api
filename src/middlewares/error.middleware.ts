import { APIGatewayProxyResult } from "aws-lambda";
import { BadRequestException, NotFoundException } from "../error/exceptions";

export function errorMiddleware(error: any): APIGatewayProxyResult {
  console.error(error);
  if (error instanceof NotFoundException) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
  if (error instanceof BadRequestException) {
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: "Internal server error",
    }),
  };
}
