import { useCounterStore } from '@/app/_stores/counter-store';

export function Counter() {
  const { count, increase, decrease } = useCounterStore();

  return (
    <div>
      <h2>Counter Store</h2>
      <h4>{count}</h4>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
