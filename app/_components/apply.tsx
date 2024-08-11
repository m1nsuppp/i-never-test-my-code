'use client';

import { useRouter } from 'next/navigation';
import { ApplicationForm } from './application-form';

export function Apply() {
  const router = useRouter();

  return (
    <section>
      <h1>지원서 작성</h1>
      <ApplicationForm
        onSuccessfulSubmit={(name) => {
          router.push(`apply/success?name=${name}`);
        }}
      />

      <div>
        <p>지원서 작성 시 주의사항</p>
        <ul>
          <li>모든 항목은 필수 입력사항입니다.</li>
          <li>지원서를 제출하면 수정할 수 없습니다.</li>
        </ul>
      </div>
    </section>
  );
}
