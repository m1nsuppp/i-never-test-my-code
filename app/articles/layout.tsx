import { createArticlesRepository } from '@/infrastructures/create-articles-repository';
import { createArticlesService } from '@/infrastructures/create-articles-service';
import { createFetchHTTPClient } from '@/infrastructures/create-fetch-http-client';
import { type PropsWithChildren } from 'react';
import { ServiceContext } from '../_contexts/service-context';

export default function ArticlesLayout({ children }: PropsWithChildren): JSX.Element {
  const httpClient = createFetchHTTPClient();
  const articlesRepository = createArticlesRepository(httpClient);
  const articlesService = createArticlesService(articlesRepository);

  return <ServiceContext.Provider value={{ articlesService }}>{children}</ServiceContext.Provider>;
}
