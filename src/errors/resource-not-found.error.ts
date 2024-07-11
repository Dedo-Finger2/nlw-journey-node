export class ResourceNotFoundError extends Error {
  public readonly statusCode: number;

  constructor(message = "Resource not found.") {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.statusCode = 404;
  }
}
