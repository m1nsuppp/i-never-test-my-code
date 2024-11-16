import { NextResponse, type NextRequest } from 'next/server';
import { type Article } from '@/entities/article';

export async function GET(_request: NextRequest): Promise<NextResponse<Article[]>> {
  const articles: Article[] = [
    {
      id: '1',
      createdAt: '2024-08-18T12:00:00Z',
      title: '테스트 기사',
      content: '이것은 테스트 기사입니다',
      category: 'frontend',
    },
    {
      id: '2',
      createdAt: '2024-08-18T12:00:00Z',
      title: '테스트 기사2',
      content: '이것은 테스트 기사입니다2',
      category: 'backend',
    },
  ];

  return NextResponse.json(articles);
}
