import { HTTPClient } from '@/lib/http-client';
import { Article } from '@/types/article';

export type ArticlesRepository = {
  getArticles: () => Promise<Article[]>;
};

export function createArticlesRepository(
  httpClient: HTTPClient
): ArticlesRepository {
  return {
    getArticles: () => httpClient.get<Article[]>('/api/articles'),
  };
}
