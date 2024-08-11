import { render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { Apply } from './apply';

const user = userEvent.setup();

describe('<Apply />', () => {
  test('폼을 정상적으로 제출하면 성공 페이지로 이동해야 한다', async () => {
    render(<Apply />);

    const nameInput = screen.getByRole('textbox', { name: /이름/i });
    const checkbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /지원/i });

    const name = '이민섭';

    await user.type(nameInput, name);
    await user.click(checkbox);
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/apply/success',
        query: { name },
      });
    });
  });
});
