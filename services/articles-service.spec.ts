import {
  ArticlesRepository,
  createArticlesRepository,
} from '@/repositories/article-repository';
import { createArticlesService, ArticlesService } from './articles-service';
import { Article } from '@/types/article';
import { HTTPError } from '@/lib/http-error';

describe('Articles 서비스', () => {
  let mockHttpClient: { get: jest.Mock };
  let articlesRepository: ArticlesRepository;
  let articlesService: ArticlesService;

  beforeEach(() => {
    mockHttpClient = { get: jest.fn() };
    articlesRepository = createArticlesRepository(mockHttpClient as any);
    articlesService = createArticlesService(articlesRepository);
  });

  describe('getArticles', () => {
    it('서버에서 모든 게시글을 가져와야 한다', async () => {
      const mockArticles: Article[] = [
        {
          id: '1',
          createdAt: '2021-01-01T00:00:00.000Z',
          title: 'lodash vs underscore',
          content: 'lodash와 underscore의 차이점에 대해 설명합니다.',
          category: 'frontend',
        },
      ];
      mockHttpClient.get.mockResolvedValue(mockArticles);

      const result = await articlesService.getArticles();
      expect(result).toEqual(mockArticles);
      expect(mockHttpClient.get).toHaveBeenCalledWith('/api/articles');
    });
  });

  describe('getArticlesByCategory', () => {
    it('특정 카테고리의 게시글만 필터링해야 한다', async () => {
      const mockArticles: Article[] = [
        {
          id: '1',
          createdAt: '2021-01-01T00:00:00.000Z',
          title: 'lodash vs underscore',
          content: 'lodash와 underscore의 차이점에 대해 설명합니다.',
          category: 'frontend',
        },
        {
          id: '2',
          createdAt: '2021-01-02T00:00:00.000Z',
          title: 'express middleware',
          content: 'express에서 사용하는 middleware에 대해 설명합니다.',
          category: 'backend',
        },
      ];
      mockHttpClient.get.mockResolvedValue(mockArticles);

      const result = await articlesService.getArticlesByCategory('frontend');
      expect(result).toEqual([mockArticles[0]]);
    });
  });

  describe('getArticlesResultMessage', () => {
    it('게시글이 있을 때 올바른 메시지를 반환해야 한다', () => {
      const articles: Article[] = [
        {
          id: '1',
          createdAt: '2021-01-01T00:00:00.000Z',
          title: 'lodash vs underscore',
          content: 'lodash와 underscore의 차이점에 대해 설명합니다.',
          category: 'frontend',
        },
        {
          id: '2',
          createdAt: '2021-01-02T00:00:00.000Z',
          title: 'express middleware',
          content: 'express에서 사용하는 middleware에 대해 설명합니다.',
          category: 'backend',
        },
        {
          id: '3',
          createdAt: '2021-01-03T00:00:00.000Z',
          title: 'numpy vs pandas',
          content: 'numpy와 pandas의 차이점에 대해 설명합니다.',
          category: 'ai',
        },
      ];
      const message = articlesService.getArticlesResultMessage(articles);
      expect(message).toBe('총 3개의 게시글이 있습니다.');
    });

    it('게시글이 없을 때 올바른 메시지를 반환해야 한다', () => {
      const message = articlesService.getArticlesResultMessage([]);
      expect(message).toBe('게시글이 없습니다.');
    });

    it('특정 카테고리에 게시글이 있을 때 올바른 메시지를 반환해야 한다', () => {
      const articles: Article[] = [
        {
          id: '1',
          createdAt: '2021-01-01T00:00:00.000Z',
          title: 'lodash vs underscore',
          content: 'lodash와 underscore의 차이점에 대해 설명합니다.',
          category: 'frontend',
        },
        {
          id: '2',
          createdAt: '2021-01-02T00:00:00.000Z',
          title: 'express middleware',
          content: 'express에서 사용하는 middleware에 대해 설명합니다.',
          category: 'backend',
        },
        {
          id: '3',
          createdAt: '2021-01-03T00:00:00.000Z',
          title: 'numpy vs pandas',
          content: 'numpy와 pandas의 차이점에 대해 설명합니다.',
          category: 'ai',
        },
        {
          id: '4',
          createdAt: '2021-01-04T00:00:00.000Z',
          title: 'docker compose',
          content: 'docker compose 사용법에 대해 설명합니다.',
          category: 'devops',
        },
        {
          id: '5',
          createdAt: '2021-01-05T00:00:00.000Z',
          title: 'redux vs mobx',
          content: 'redux와 mobx의 차이점에 대해 설명합니다.',
          category: 'frontend',
        },
      ];
      const message = articlesService.getArticlesResultMessage(
        articles,
        'frontend'
      );
      expect(message).toBe(
        '카테고리 "frontend"에 해당하는 총 2개의 게시글이 있습니다.'
      );
    });

    it('특정 카테고리에 게시글이 없을 때 올바른 메시지를 반환해야 한다', () => {
      const message = articlesService.getArticlesResultMessage([], 'backend');
      expect(message).toBe('카테고리 "backend"에 해당하는 게시글이 없습니다.');
    });
  });

  describe('HTTP 요청 실패 시, HTTPError throw해야 한다', () => {
    it('getArticles', async () => {
      expect.assertions(1);

      mockHttpClient.get.mockRejectedValue(
        new HTTPError(500, 'Internal Server Error')
      );
      try {
        await articlesService.getArticles();
        jest.spyOn(articlesService, 'getArticles');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
      }
    });

    it('getArticlesByCategory', async () => {
      expect.assertions(1);

      mockHttpClient.get.mockRejectedValue(
        new HTTPError(500, 'Internal Server Error')
      );
      try {
        await articlesService.getArticlesByCategory('frontend');
        jest.spyOn(articlesService, 'getArticlesByCategory');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
      }
    });
  });
});
