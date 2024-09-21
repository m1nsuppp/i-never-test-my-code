import { render, screen } from '@testing-library/react';
import { Navigation } from '@/app/_components/navigation';

// https://github.com/amannn/next-intl/discussions/331
const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

test('현재 경로에 해당하는 링크는 aria-current 속성을 page로 가지고 있다.', () => {
  mockUsePathname.mockImplementation(() => '/about');

  render(<Navigation />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  const homeLink = screen.getByRole('link', { name: 'Home' });

  expect(aboutLink).toHaveAttribute('aria-current', 'page');
  expect(homeLink).not.toHaveAttribute('aria-current');
});
