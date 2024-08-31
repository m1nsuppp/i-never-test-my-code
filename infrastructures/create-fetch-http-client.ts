import { type Config, type HTTPClient } from '../clients/http-client';

function paramsToString(params: URLSearchParams | undefined): string {
  return params ? `?${params.toString()}` : '';
}

export function createFetchHTTPClient(
  baseURL: string = '',
  defaultHeaders: HeadersInit = {}
): HTTPClient {
  const createEndpoint = (path: string, params?: URLSearchParams) =>
    `${baseURL}${path}${paramsToString(params)}`;

  const handleResponse = async <D = unknown>(
    response: Response
  ): Promise<D> => {
    if (response.status === 204) {
      return {} as D;
    }

    const responseBody = await response.json().catch(() => {
      throw new Error('응답 본문을 JSON으로 파싱하는데 실패했습니다.');
    });

    if (!response.ok) {
      throw responseBody;
    }

    return responseBody;
  };

  const request = async <D = unknown>(
    method: string,
    path: string,
    body?: unknown,
    config: Config = {}
  ): Promise<D> => {
    const endpoint = createEndpoint(path, config.params);

    const response = await fetch(endpoint, {
      method,
      headers: { ...defaultHeaders, ...config.headers },
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<D>(response);
  };

  return {
    get: <D = unknown>(path: string, config: Config = {}) =>
      request<D>('GET', path, undefined, config),
    post: <D = unknown>(path: string, body?: unknown, config: Config = {}) =>
      request<D>('POST', path, body, config),
    put: <D = unknown>(path: string, body?: unknown, config: Config = {}) =>
      request<D>('PUT', path, body, config),
    delete: <D = unknown>(path: string, config: Config = {}) =>
      request<D>('DELETE', path, undefined, config),
  };
}
