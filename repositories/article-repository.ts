import { type Article } from '@/entities/article';

export type ArticlesRepository = {
  getArticles: () => Promise<Article[]>;
};
