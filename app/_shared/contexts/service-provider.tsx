'use client';

import { createArticlesRepository } from '@/infrastructures/create-articles-repository';
import { createArticlesService } from '@/infrastructures/create-articles-service';
import { createFetchHTTPClient } from '@/infrastructures/create-fetch-http-client';
import { type ArticlesService } from '@/usecases/articles-service';
import { createContext, useMemo, type ReactNode } from 'react';

export const ServiceContext = createContext<
  | {
      articlesService: ArticlesService;
    }
  | undefined
>(undefined);

ServiceContext.displayName = 'ServiceContext';

export function ServiceProvider({ children }: { children: ReactNode }): JSX.Element {
  const services = useMemo(() => {
    const httpClient = createFetchHTTPClient('http://localhost:3000/api');
    const articlesRepository = createArticlesRepository(httpClient);
    const articlesService = createArticlesService(articlesRepository);

    return { articlesService };
  }, []);

  return <ServiceContext.Provider value={services}>{children}</ServiceContext.Provider>;
}
