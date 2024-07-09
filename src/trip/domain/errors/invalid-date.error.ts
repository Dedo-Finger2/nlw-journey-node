export class InvalidDateError extends Error {
  public readonly code: number;

  constructor(message = "Invalid date.") {
    super(message);
    this.name = this.constructor.name;
    this.code = 400;
  }
}
