export class InvalidResourceError extends Error {
  public readonly statusCode: number;

  constructor(message = "Invalid resource.") {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.statusCode = 400;
  }
}
