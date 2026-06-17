export default class customError extends Error {
  statusCode = 0;
  constructor(code: number, message: string) {
    super(message);
    this.statusCode = code;
  }
}
