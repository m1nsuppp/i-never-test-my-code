import { render, waitFor } from '@testing-library/react';
import ArticlesPage from './page';
import { screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServiceContext } from '@/app/_shared/contexts/service-provider';

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

  test('http 요청에 실패할 경우, 에러를 표시한다.', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(<ArticlesPage />, {
      wrapper: ({ children }) => (
        <ServiceContext.Provider
          value={{
            articlesService: {
              fetchArticles: () => Promise.reject(new Error('Failed to fetch articles')),
            },
          }}
        >
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ServiceContext.Provider>
      ),
    });

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: '기사를 불러오지 못했어요.' }),
      ).toBeInTheDocument();
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
