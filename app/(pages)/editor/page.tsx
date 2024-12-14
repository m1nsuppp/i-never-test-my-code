import { AspectRatioSelect } from './_components/aspect-ratio-select';
import { Canvas } from './_components/canvas';
import { AspectRatioProvider } from './_contexts/aspect-ratio-provider';

export default function EditorPage(): JSX.Element {
  return (
    <AspectRatioProvider
      initialAspectRatio={{
        width: 1,
        height: 1,
        label: '1:1',
      }}
    >
      <Canvas />
      <AspectRatioSelect />
    </AspectRatioProvider>
  );
}
