import {
  CounterStoreProvider,
  useCounterStoreContext,
} from '@/app/_contexts/counter-store-context';

function Counter() {
  const { count, increase, decrease } = useCounterStoreContext((state) => state);

  return (
    <div>
      <h2>Counter Store Context</h2>
      <h4>{count}</h4>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export function CounterWithContext() {
  return (
    <CounterStoreProvider>
      <Counter />
    </CounterStoreProvider>
  );
}
