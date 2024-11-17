'use client';

import { useLongRequest } from '../_hooks/use-long-request';

export function AwaitButton(): JSX.Element {
  const { mutate: startLongRequest, isPending: isLongRequestPending, reset } = useLongRequest();

  return (
    <div className="flex gap-10">
      <button
        type="button"
        onClick={() =>
          startLongRequest(undefined, {
            onSuccess: () => alert('완료'),
          })
        }
      >
        {isLongRequestPending ? '로딩 중...' : '시작'}
      </button>
      <button
        type="reset"
        onClick={reset}
      >
        취소
      </button>
    </div>
  );
}
