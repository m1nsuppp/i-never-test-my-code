import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import './globals.css';
import { ReactQueryProvider } from './_shared/_components/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend Playground',
  description: 'Frontend Playground',
};

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
