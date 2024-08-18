export type Config = {
  headers?: Record<string, string>;
  params?: URLSearchParams;
};

export class HTTPError<E = unknown> extends Error {
  constructor(public status: number, message: string, public data?: E) {
    super(message);
    this.name = 'HTTPError';
  }
}

export type HTTPClient = {
  get: <D = unknown>(path: string, config?: Config) => Promise<D>;
  post: <D = unknown>(
    path: string,
    body?: unknown,
    config?: Config
  ) => Promise<D>;
  put: <D = unknown>(
    path: string,
    body?: unknown,
    config?: Config
  ) => Promise<D>;
  delete: <D = unknown>(path: string, config?: Config) => Promise<D>;
};
