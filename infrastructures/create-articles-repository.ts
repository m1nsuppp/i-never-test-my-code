import { type HTTPClient } from '@/clients/http-client';
import { type Article } from '@/entities/article';
import { type ArticlesRepository } from '@/repositories/article-repository';

export function createArticlesRepository(httpClient: HTTPClient): ArticlesRepository {
  return {
    fetchArticles: async () => {
      const data = await httpClient.get<Article[]>('/articles');

      return data;
    },
  };
}
