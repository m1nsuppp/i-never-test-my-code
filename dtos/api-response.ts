export type APIError = {
  message: string;
  code: number;
};

interface APIResponseBase {
  status: number;
  statusText: string;
}

export interface APIResponseSuccess<T> extends APIResponseBase {
  error: null;
  data: T;
}

export interface APIResponseFailure extends APIResponseBase {
  error: APIError;
  data: null;
}

export type APIResponse<T> = APIResponseSuccess<T> | APIResponseFailure;
