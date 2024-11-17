import { NextResponse, type NextRequest } from 'next/server';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest): Promise<NextResponse<{ message: string }>> {
  await sleep(10_000);

  return NextResponse.json({
    message: '완료',
  });
}
