import { type StateCreator } from 'zustand';

export type CounterStore = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

export const counterStoreCreator: StateCreator<CounterStore> = (set) => {
  return {
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
  };
};
