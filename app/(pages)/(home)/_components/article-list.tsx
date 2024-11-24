'use client';

import { useQuery } from '@/app/_shared/hooks/use-query';
import { useTypedContext } from '@/app/_shared/hooks/use-typed-context';
import { ServiceContext } from '@/app/_shared/providers/service-provider';
import { Article } from '@/entities/article';

export function ArticleList(): JSX.Element {
  const { articlesService } = useTypedContext(ServiceContext);

  const { data: articles } = useQuery<Article[]>({
    queryFn: articlesService.fetchArticles,
  });

  if (!articles) return <div>loading...</div>;

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
