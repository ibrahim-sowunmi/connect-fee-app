import { Background, BackgroundVariant } from 'reactflow';

export default function CustomBackground() {
  return (
    <>
      <Background
        variant={BackgroundVariant.Lines}
        gap={12}
        size={0.1}
        color="#d1d5db"
        style={{ opacity: 0.1 }}
      />
      <Background
        variant={BackgroundVariant.Lines}
        gap={12}
        size={0.1}
        color="#d1d5db"
        style={{ opacity: 0.1 }}
      />
    </>
  );
}
