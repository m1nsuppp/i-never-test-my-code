export type Config = {
  headers?: Record<string, string>;
  params?: URLSearchParams;
};

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
