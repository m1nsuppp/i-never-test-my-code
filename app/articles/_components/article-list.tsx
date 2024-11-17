'use client';

import { ServiceContext } from '@/app/articles/_contexts/service-context';
import { useQuery } from '@/app/_shared/_hooks/use-query';
import { useTypedContext } from '@/app/_shared/_hooks/use-typed-context';
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
