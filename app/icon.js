import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#000d1a',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #00BFFF',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              color: '#00BFFF',
              fontSize: 17,
              fontWeight: 900,
              fontFamily: 'Arial, sans-serif',
              lineHeight: 1,
            }}
          >
            B
          </span>
        </div>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
