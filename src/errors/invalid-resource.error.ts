export class InvalidResourceError extends Error {
  constructor(message = "Invalid resource.") {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
  }
}
