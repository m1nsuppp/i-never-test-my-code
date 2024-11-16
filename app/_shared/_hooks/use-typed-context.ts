import { type Context, useContext } from 'react';

export function useTypedContext<T>(context: Context<T | undefined>): T {
  const contextValue = useContext(context);

  if (contextValue === undefined) {
    throw new Error(`${context.displayName}를 찾을 수 없습니다. Provider를 찾아서 제공해주세요.`);
  }

  return contextValue;
}
