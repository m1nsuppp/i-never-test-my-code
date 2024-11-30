import { Suspense } from 'react';
import { ArticleList } from './_components/article-list';

export default function ArticlesPage(): JSX.Element {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          className="flex flex-wrap gap-3"
        >
          <div className="w-20 h-20 bg-gray-200 animate-pulse" />
          <div className="w-20 h-20 bg-gray-200 animate-pulse" />
          <div className="w-20 h-20 bg-gray-200 animate-pulse" />
          <div className="w-20 h-20 bg-gray-200 animate-pulse" />
          <div className="w-20 h-20 bg-gray-200 animate-pulse" />
        </div>
      }
    >
      <ArticleList />
    </Suspense>
  );
}
