import { Suspense } from 'react';
import { ArticleList } from './_components/article-list';
import { ErrorBoundary } from 'react-error-boundary';

export default function ArticlesPage(): JSX.Element {
  return (
    <ErrorBoundary fallback={<h2>기사를 불러오지 못했어요.</h2>}>
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
    </ErrorBoundary>
  );
}
