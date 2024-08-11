'use client';

import { InputHTMLAttributes, useState } from 'react';

export function ApplicationForm({
  onSuccessfulSubmit,
}: {
  onSuccessfulSubmit: (name: string) => void;
}) {
  const [name, setName] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  return (
    <form
      aria-label="지원서"
      className="flex flex-col gap-5 p-5 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        onSuccessfulSubmit(name);
      }}
    >
      <Input
        label="이름"
        id="name"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Agreement onChange={setIsAgreed} />
      <button
        type="submit"
        className="p-2 text-white bg-blue-500 rounded-md disabled:opacity-50"
        disabled={!isAgreed || !(name.length >= 2)}
      >
        지원
      </button>
    </form>
  );
}

function Input(
  props: InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  }
) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-sm font-semibold">
        {props.label}
      </label>
      <input {...props} className="p-2 border border-gray-300 rounded-md" />
    </div>
  );
}

function Agreement({ onChange }: { onChange: (value: boolean) => void }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-semibold">약관 동의</legend>
      <label className="flex gap-2">
        <input type="checkbox" onChange={(e) => onChange(e.target.checked)} />
        <span className="text-sm">개인정보 수집 및 이용에 동의합니다.</span>
      </label>
    </fieldset>
  );
}
