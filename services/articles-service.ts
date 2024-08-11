import { ArticlesRepository } from '@/repositories/article-repository';
import { Article } from '@/types/article';

export type ArticlesService = {
  getArticles: () => Promise<Article[]>;
  getArticlesByCategory: (category: Article['category']) => Promise<Article[]>;
  getArticlesResultMessage: (
    articles: Article[],
    category?: Article['category']
  ) => string;
};

export function createArticlesService(
  articlesRepository: ArticlesRepository
): ArticlesService {
  return {
    getArticles: articlesRepository.getArticles,
    getArticlesByCategory: (category) =>
      articlesRepository
        .getArticles()
        .then((articles) =>
          articles.filter((article) => article.category === category)
        ),
    getArticlesResultMessage: (articles, category) => {
      const filteredArticles = category
        ? articles.filter((article) => article.category === category)
        : articles;

      if (filteredArticles.length === 0) {
        return category
          ? `카테고리 "${category}"에 해당하는 게시글이 없습니다.`
          : '게시글이 없습니다.';
      }

      return category
        ? `카테고리 "${category}"에 해당하는 총 ${filteredArticles.length}개의 게시글이 있습니다.`
        : `총 ${filteredArticles.length}개의 게시글이 있습니다.`;
    },
  };
}
