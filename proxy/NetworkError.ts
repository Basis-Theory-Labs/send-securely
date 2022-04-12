export class NetworkError extends Error {
  public constructor(
    public readonly statusCode: number,
    message?: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}
