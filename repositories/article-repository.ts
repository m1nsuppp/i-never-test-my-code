import { type Article } from '@/entities/article';

export type ArticlesRepository = {
  fetchArticles: () => Promise<Article[]>;
};
