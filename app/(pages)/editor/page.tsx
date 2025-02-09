'use client';

import { Suspense } from 'react';
import { AspectRatioSelect } from './_components/aspect-ratio-select';
import { Canvas } from './_components/canvas';
import { type AspectRatio, AspectRatioProvider } from './_contexts/aspect-ratio-provider';
import { useSuspenseQuery } from '@tanstack/react-query';

function _EditorPage(): JSX.Element {
  const { data: aspectRatio } = useSuspenseQuery({
    queryKey: ['aspect-ratio'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/canvas');

      if (!response.ok) {
        throw new Error('Failed to get aspect ratio');
      }

      const aspectRatio = (await response.json()) as AspectRatio;

      return aspectRatio;
    },
  });

  return (
    <AspectRatioProvider initialAspectRatio={aspectRatio}>
      <Canvas />
      <AspectRatioSelect />
    </AspectRatioProvider>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <_EditorPage />
    </Suspense>
  );
}
