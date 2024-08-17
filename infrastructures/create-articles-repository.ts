import { type Article } from '@/entities/article';
import { type HTTPClient } from '@/lib/http-client';
import { type ArticlesRepository } from '@/repositories/article-repository';

export function createArticlesRepository(
  httpClient: HTTPClient
): ArticlesRepository {
  return {
    getArticles: () => httpClient.get<Article[]>('/api/articles'),
  };
}
