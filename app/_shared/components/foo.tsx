import { useRouter } from 'next/navigation';

export function Foo(): JSX.Element {
  const router = useRouter();

  return <button onClick={() => router.push('/foo')}>go to foo</button>;
}
