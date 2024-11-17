import { type ArticlesService } from '@/usecases/articles-service';
import { render } from '@testing-library/react';
import ArticlesPage from './page';
import { ServiceContext } from './_contexts/service-context';

describe('ArticlesPage', () => {
  test('fetchArticles가 호출된다.', () => {
    const fn = jest.fn();
    const articlesService: ArticlesService = {
      fetchArticles: fn,
    };

    render(<ArticlesPage />, {
      wrapper: ({ children }) => (
        <ServiceContext.Provider value={{ articlesService }}>{children}</ServiceContext.Provider>
      ),
    });

    expect(fn).toHaveBeenCalled();
  });
});
