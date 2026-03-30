export const dynamic = 'force-dynamic';

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 100 100">
          {/* Shield — thick stroke for legibility at 32px */}
          <path
            d="M50 6 L87 21 L87 53 C87 71 69 86 50 94 C31 86 13 71 13 53 L13 21 Z"
            fill="#001020"
            stroke="#00BFFF"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Bug body */}
          <ellipse cx="50" cy="58" rx="14" ry="18" fill="#00BFFF" />
          {/* Bug head */}
          <circle cx="50" cy="37" r="10" fill="#00BFFF" />
        </svg>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
