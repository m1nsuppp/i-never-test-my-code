export class HTTPError<E = unknown> extends Error {
  constructor(public status: number, message: string, public data?: E) {
    super(message);
    this.name = 'HTTPError';
  }
}
