import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

type UseLongRequestResult = UseMutationResult<unknown, Error, void, void>;

type UseLongRequestOptions = UseMutationOptions<unknown, Error, void, void>;

export function useLongRequest(options?: UseLongRequestOptions): UseLongRequestResult {
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation<unknown, Error, void, void>({
    mutationFn: async () => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const response = await fetch('/api/await', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current?.signal,
      });

      if (!response.ok) {
        throw new Error('요청 실패');
      }

      return response.json() as unknown;
    },
    ...options,
  });

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    mutation.reset();
  }, [mutation.reset]);

  return {
    ...mutation,
    reset,
  };
}
