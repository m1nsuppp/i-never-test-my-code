'use client';

import { useEffect, useRef } from 'react';
import { useAspectRatioStore } from '../_contexts/aspect-ratio-provider';

type Size = {
  width: number;
  height: number;
};

const maxSize: Size = {
  width: 640,
  height: 640,
} as const;

export function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedAspectRatio = useAspectRatioStore((state) => state.aspectRatio);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const aspectRatio = selectedAspectRatio.width / selectedAspectRatio.height;

    if (maxSize.width / maxSize.height > aspectRatio) {
      canvas.width = maxSize.height * aspectRatio;
      canvas.height = maxSize.height;
    } else {
      canvas.width = maxSize.width;
      canvas.height = maxSize.width / aspectRatio;
    }
  }, [selectedAspectRatio]);

  return <canvas ref={canvasRef} />;
}
