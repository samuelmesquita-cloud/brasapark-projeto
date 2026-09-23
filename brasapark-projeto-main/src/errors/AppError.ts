export class AppError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly field?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}
