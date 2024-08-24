import { ApiResponse } from '@/\bdtos/api-response';
import { type HTTPClient } from '@/clients/http-client';
import { type Article } from '@/entities/article';
import { type ArticlesRepository } from '@/repositories/article-repository';

export function createArticlesRepository(
  httpClient: HTTPClient
): ArticlesRepository {
  return {
    fetchArticles: async () => {
      const { data, error } = await httpClient.get<ApiResponse<Article[]>>(
        '/articles'
      );

      if (error) {
        throw error;
      }

      return data;
    },
  };
}
