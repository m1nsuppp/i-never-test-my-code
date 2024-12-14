import { render } from '@testing-library/react';
import { AspectRatioProvider } from '../_contexts/aspect-ratio-provider';
import { Canvas } from './canvas';

describe('EditorPage', () => {
  test('aspect ratio에 맞게 canvas가 렌더링 된다', () => {
    const aspectRatio = { width: 16, height: 9 };
    const { container } = render(<Canvas />, {
      wrapper: ({ children }) => (
        <AspectRatioProvider initialAspectRatio={{ ...aspectRatio, label: '16:9' }}>
          {children}
        </AspectRatioProvider>
      ),
    });

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();

    expect(canvas).toHaveAttribute('width', (640).toString());
    expect(canvas).toHaveAttribute('height', (360).toString());
  });
});
