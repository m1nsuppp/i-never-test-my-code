'use client';

import { AspectRatio, useAspectRatioStore } from '../_contexts/aspect-ratio-provider';

export function AspectRatioSelect() {
  const { setAspectRatio, aspectRatio: selectedAspectRatio } = useAspectRatioStore(
    (state) => state,
  );

  return (
    <div role="listbox">
      {aspectRatios.map((aspectRatio) => (
        <div
          key={aspectRatio.label}
          role="menuitem"
          aria-selected={aspectRatio.label === selectedAspectRatio.label}
          onClick={() => setAspectRatio(aspectRatio)}
          className={aspectRatio.label === selectedAspectRatio.label ? 'bg-gray-200' : ''}
        >
          {aspectRatio.label}
        </div>
      ))}
    </div>
  );
}

const aspectRatios: AspectRatio[] = [
  { width: 1, height: 1, label: '1:1' },
  { width: 4, height: 3, label: '4:3' },
  { width: 16, height: 9, label: '16:9' },
];
