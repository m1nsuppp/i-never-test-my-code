'use client';

import { useTypedContext } from '@/app/_shared/hooks/use-typed-context';
import { ServiceContext } from '@/app/_shared/contexts/service-provider';
import { Article } from '@/entities/article';
import { useSuspenseQuery } from '@tanstack/react-query';

export function ArticleList(): JSX.Element {
  const { articlesService } = useTypedContext(ServiceContext);

  const { data: articles } = useSuspenseQuery<Article[], Error>({
    queryKey: ['articles'],
    queryFn: articlesService.fetchArticles,
  });

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  );
}
