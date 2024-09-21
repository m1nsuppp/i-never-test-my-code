import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import './globals.css';
import { Navigation } from './_components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend Playground',
  description: 'Frontend Playground',
};

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
