import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#000d1a',
          borderRadius: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '6px solid #00BFFF',
        }}
      >
        <span
          style={{
            color: '#00BFFF',
            fontSize: 90,
            fontWeight: 900,
            fontFamily: 'Arial, sans-serif',
            lineHeight: 1,
          }}
        >
          B
        </span>
        <span
          style={{
            color: '#00BFFF',
            fontSize: 20,
            fontWeight: 700,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: 4,
            marginTop: -4,
          }}
        >
          ZERO
        </span>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
