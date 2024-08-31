import { type ArticlesRepository } from '@/repositories/article-repository';
import { type Article } from '@/entities/article';
import { type APIResponseFailure } from '@/dtos/api-response';
import { createArticlesService } from '@/infrastructures/create-articles-service';

describe('createArticlesService', () => {
  let mockArticlesRepository: jest.Mocked<ArticlesRepository>;

  beforeEach(() => {
    mockArticlesRepository = {
      fetchArticles: jest.fn(),
    };
  });

  it('fetchArticles를 가진 ArticlesService를 생성해야 한다', () => {
    const articlesService = createArticlesService(mockArticlesRepository);
    expect(articlesService).toHaveProperty('fetchArticles');
    expect(typeof articlesService.fetchArticles).toBe('function');
  });

  it('service.fetchArticles가 호출될 때 repository.fetchArticles를 호출해야 한다', async () => {
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

  it('repository.fetchArticles에서 에러가 발생하면 해당 에러에 대한 response body를 throw 한다.', async () => {
    const articlesService = createArticlesService(mockArticlesRepository);

    const fixtureError: APIResponseFailure = {
      data: null,
      status: 500,
      statusText: 'Internal Server Error',
      error: {
        message: 'Internal Server Error',
        code: 500,
      },
    };

    mockArticlesRepository.fetchArticles.mockRejectedValue(fixtureError);

    await expect(articlesService.fetchArticles()).rejects.toEqual(fixtureError);
    expect(mockArticlesRepository.fetchArticles).toHaveBeenCalledTimes(1);
  });
});
