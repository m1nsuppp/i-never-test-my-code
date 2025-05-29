import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Foo } from './foo';
import memoryRouter from 'next-router-mock';
import { describe, expect, test, vi } from 'vitest';

vi.mock('next/navigation');

describe('<Foo />', () => {
  test('버튼을 클릭하면 /foo로 이동한다.', async () => {
    render(<Foo />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(memoryRouter.pathname).toBe('/foo');
    });
  });
});
