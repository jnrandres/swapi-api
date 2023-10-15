export class NotFoundException extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundException";
    this.statusCode = 404;
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class BadRequestException extends Error {
  statusCode: number;
  constructor(message?: string) {
    super(message);
    this.name = "BadRequestException";
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
