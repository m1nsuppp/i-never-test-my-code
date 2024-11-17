import { type ReactNode, createContext, useContext, useRef } from 'react';
import { createStore } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { type CounterStore, counterStoreCreator } from '../_shared/stores/counter-store-creator';

export const createCounterStore = () => {
  return createStore<CounterStore>(counterStoreCreator);
};

export type CounterStoreApi = ReturnType<typeof createCounterStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export interface CounterStoreProviderProps {
  children: ReactNode;
}

export function CounterStoreProvider({ children }: CounterStoreProviderProps) {
  const counterStoreRef = useRef<CounterStoreApi>();

  if (!counterStoreRef.current) {
    counterStoreRef.current = createCounterStore();
  }

  return (
    <CounterStoreContext.Provider value={counterStoreRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
}

export type UseCounterStoreContextSelector<T> = (store: CounterStore) => T;

export const useCounterStoreContext = <T,>(selector: UseCounterStoreContextSelector<T>): T => {
  const counterStoreContext = useContext(CounterStoreContext);

  if (counterStoreContext === undefined) {
    throw new Error('useCounterStoreContext는 <CountStoreProvider> 내에서만 사용할 수 있습니다.');
  }

  return useStoreWithEqualityFn(counterStoreContext, selector, shallow);
};
