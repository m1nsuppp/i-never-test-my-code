import { type ArticlesRepository } from '@/repositories/article-repository';
import { type ArticlesService } from '@/usecases/articles-service';

export function createArticlesService(
  articlesRepository: ArticlesRepository
): ArticlesService {
  return {
    fetchArticles: () => articlesRepository.fetchArticles(),
  };
}
