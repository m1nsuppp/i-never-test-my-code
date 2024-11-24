import { type ArticlesRepository } from '@/repositories/article-repository';
import { type Article } from '@/entities/article';
import { createArticlesService } from '@/infrastructures/create-articles-service';

describe('createArticlesService', () => {
  let mockArticlesRepository: jest.Mocked<ArticlesRepository>;

  beforeEach(() => {
    mockArticlesRepository = {
      fetchArticles: jest.fn(),
    };
  });

  test('fetchArticles를 가진 ArticlesService를 생성해야 한다', () => {
    const articlesService = createArticlesService(mockArticlesRepository);
    expect(articlesService).toHaveProperty('fetchArticles');
    expect(typeof articlesService.fetchArticles).toBe('function');
  });

  test('service.fetchArticles가 호출될 때 repository.fetchArticles를 호출해야 한다', async () => {
    const articlesService = createArticlesService(mockArticlesRepository);
    const fixtureArticles: Article[] = [
      {
        id: '1',
        createdAt: '2024-08-18T12:00:00Z',
        title: '테스트 기사',
        content: '이것은 테스트 기사입니다',
        category: 'frontend',
      },
    ];

    mockArticlesRepository.fetchArticles.mockResolvedValue(fixtureArticles);

    const articles = await articlesService.fetchArticles();

    expect(mockArticlesRepository.fetchArticles).toHaveBeenCalledTimes(1);
    expect(articles).toEqual(fixtureArticles);
  });

  test('실패 시, 에러를 던져야 한다', async () => {
    const articlesService = createArticlesService(mockArticlesRepository);

    mockArticlesRepository.fetchArticles.mockRejectedValue(new Error('테스트 에러'));

    await expect(articlesService.fetchArticles()).rejects.toThrow('테스트 에러');
  });
});
