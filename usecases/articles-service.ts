import { type Article } from '@/entities/article';

export type ArticlesService = {
  fetchArticles: () => Promise<Article[]>;
};
