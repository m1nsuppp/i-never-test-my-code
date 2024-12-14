import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { PropsWithChildren } from 'react';
import './globals.css';
import { ReactQueryProvider } from './_shared/contexts/react-query-provider';
import { ServiceProvider } from './_shared/contexts/service-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontend Playground',
  description: 'Frontend Playground',
};

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ServiceProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}
