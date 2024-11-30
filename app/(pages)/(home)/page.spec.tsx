import { render, waitFor } from '@testing-library/react';
import ArticlesPage from './page';
import { screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServiceContext } from '@/app/_shared/providers/service-provider';

describe('ArticlesPage', () => {
  test('로딩 상태를 표시한다.', async () => {
    renderArticlesPage();

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  test('ArticleList가 렌더링 된다.', async () => {
    renderArticlesPage();

    await waitFor(() => {
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('content')).toBeInTheDocument();
    });
  });
});

function renderArticlesPage(): void {
  const queryClient = new QueryClient();

  render(<ArticlesPage />, {
    wrapper: ({ children }) => (
      <ServiceContext.Provider
        value={{
          articlesService: {
            fetchArticles: () =>
              Promise.resolve([
                {
                  id: '1',
                  createdAt: '2021-01-01',
                  title: 'title',
                  content: 'content',
                  category: 'frontend',
                },
              ]),
          },
        }}
      >
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ServiceContext.Provider>
    ),
  });
}
