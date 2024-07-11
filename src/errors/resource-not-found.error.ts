export class ResourceNotFoundError extends Error {
  constructor(message = "Resource not found.") {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}
