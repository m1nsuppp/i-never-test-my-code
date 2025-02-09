import { AspectRatio } from '@/app/(pages)/editor/_contexts/aspect-ratio-provider';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(_request: NextRequest): Promise<NextResponse<AspectRatio>> {
  await sleep(1000);

  return NextResponse.json({
    width: 1360,
    height: 768,
    label: '16:9',
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
