import { type PropsWithChildren } from 'react';
import { Navigation } from './_components/navigation';

export default function HomeLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <main className="flex gap-4">
      <Navigation />
      {children}
    </main>
  );
}
