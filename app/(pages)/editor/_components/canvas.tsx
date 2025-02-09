'use client';

import { useEffect, useRef } from 'react';
import { useAspectRatioStore } from '../_contexts/aspect-ratio-provider';

type Size = {
  width: number;
  height: number;
};

const MAX_SIZE: Size = {
  width: 640,
  height: 640,
} as const;

export function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedAspectRatio = useAspectRatioStore((state) => state.aspectRatio);

  const { width, height } = getCanvasSize(selectedAspectRatio, MAX_SIZE);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #000000',
        width,
        height,
      }}
    />
  );
}

function getCanvasSize(
  aspectRatio: { width: number; height: number },
  maxSize: Size = MAX_SIZE,
): Size {
  const ratio = aspectRatio.width / aspectRatio.height;

  const shouldConstrainWidth = MAX_SIZE.width / ratio > MAX_SIZE.height;

  if (shouldConstrainWidth) {
    return {
      width: maxSize.height * ratio,
      height: maxSize.height,
    };
  }

  return {
    width: maxSize.width,
    height: maxSize.width / ratio,
  };
}
