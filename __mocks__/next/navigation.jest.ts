// NOTE: 정확한 mocking을 위해 파일명을 navigation.ts로 변경할 것

import mockRouter from 'next-router-mock';
import { createDynamicRouteParser } from 'next-router-mock/dynamic-routes';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

mockRouter.useParser(
  createDynamicRouteParser([
    // @see https://github.com/scottrippey/next-router-mock#dynamic-routes
  ]),
);

jest.mock<typeof import('next/navigation')>('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  const nextRouterMock = jest.requireActual('next-router-mock');
  const { useRouter } = nextRouterMock;
  const usePathname = jest.fn().mockImplementation(() => {
    const router = useRouter();
    return router.asPath;
  });

  const useSearchParams = jest.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  });

  return {
    ...actual,
    useRouter: jest.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});

export { mockRouter };
