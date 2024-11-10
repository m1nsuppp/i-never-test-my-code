import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CounterWithContext } from '.';

describe('<CounterWithContext>', () => {
  test('초기상태는 0으로 렌더링된다.', async () => {
    renderCounterWithContext();

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  test('+ 버튼을 누르면, count가 1 증가한다.', async () => {
    const user = userEvent.setup();

    renderCounterWithContext();

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByText('+'));
    });

    expect(await screen.findByText(/^1$/)).toBeInTheDocument();
  });

  test('- 버튼을 누르면, count가 1 감소한다.', async () => {
    const user = userEvent.setup();

    renderCounterWithContext();

    expect(await screen.findByText(/^0$/)).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByText('-'));
    });

    expect(await screen.findByText(/^-1$/)).toBeInTheDocument();
  });
});

const renderCounterWithContext = () => {
  return render(<CounterWithContext />);
};
