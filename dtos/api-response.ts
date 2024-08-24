export type ApiError = {
  message: string;
  code: number;
};

interface ApiResponseBase {
  status: number;
  statusText: string;
}

export interface ApiResponseSuccess<T> extends ApiResponseBase {
  error: null;
  data: T;
}

export interface ApiResponseFailure extends ApiResponseBase {
  error: ApiError;
  data: null;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseFailure;
