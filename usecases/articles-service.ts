import { type Article } from '@/entities/article';

export type ArticlesService = {
  getArticles: () => Promise<Article[]>;
  getArticlesByCategory: (category: Article['category']) => Promise<Article[]>;
  getArticlesResultMessage: (
    articles: Article[],
    category?: Article['category']
  ) => string;
};
