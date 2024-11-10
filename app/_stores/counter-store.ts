import { create } from 'zustand';
import { type CounterStore, counterStoreCreator } from '../_shared/stores/counter-store-creator';

export const useCounterStore = create<CounterStore>()(counterStoreCreator);
