import BlobSvg from '@/assets/decorative/card-blob.svg?react';

export function CardBlob() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: -30, top: -58, width: 545, height: 211, overflow: 'clip', opacity: 0.4 }}
    >
      <div
        style={{
          position: 'absolute',
          width: 884,
          height: 927,
          left: -170,
          top: -166,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ transform: 'rotate(143.65deg)', flexShrink: 0 }}>
          <BlobSvg />
        </div>
      </div>
    </div>
  );
}
