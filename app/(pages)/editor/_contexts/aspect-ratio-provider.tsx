'use client';

import { useTypedContext } from '@/app/_shared/hooks/use-typed-context';
import { createContext, type ReactNode, useState } from 'react';
import { createStore, type StoreApi, useStore } from 'zustand';

export type AspectRatio = {
  width: number;
  height: number;
  label: string;
};

interface AspectRatioStore {
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
}

const AspectRatioStoreContext = createContext<StoreApi<AspectRatioStore> | undefined>(undefined);
AspectRatioStoreContext.displayName = 'AspectRatioStoreContext';

export function createAspectRatioStore(initialAspectRatio: AspectRatio) {
  return createStore<AspectRatioStore>((set) => ({
    aspectRatio: initialAspectRatio,
    setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  }));
}

interface AspectRatioProviderProps {
  children: ReactNode;
  initialAspectRatio: AspectRatio;
}

export function AspectRatioProvider({ children, initialAspectRatio }: AspectRatioProviderProps) {
  const [store] = useState(() => createAspectRatioStore(initialAspectRatio));

  return (
    <AspectRatioStoreContext.Provider value={store}>{children}</AspectRatioStoreContext.Provider>
  );
}

export function useAspectRatioStore<T>(selector: (state: AspectRatioStore) => T) {
  const store = useTypedContext(AspectRatioStoreContext);

  return useStore(store, selector);
}
