export const dynamic = 'force-dynamic';

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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          {/* Shield */}
          <path
            d="M50 8 L88 22 L88 52 C88 70 70 85 50 94 C30 85 12 70 12 52 L12 22 Z"
            fill="#000d1a"
            stroke="#00BFFF"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* Bug body */}
          <ellipse cx="50" cy="54" rx="12" ry="16" fill="#00BFFF" />
          {/* Bug head */}
          <circle cx="50" cy="36" r="7" fill="#00BFFF" />
          {/* Antennae */}
          <line x1="50" y1="30" x2="42" y2="22" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="30" x2="58" y2="22" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left legs */}
          <line x1="38" y1="50" x2="26" y2="46" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="55" x2="26" y2="54" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="60" x2="26" y2="64" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right legs */}
          <line x1="62" y1="50" x2="74" y2="46" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="62" y1="55" x2="74" y2="54" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="62" y1="60" x2="74" y2="64" stroke="#00BFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Center line */}
          <line x1="50" y1="40" x2="50" y2="70" stroke="#000d1a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { width: 180, height: 180 }
  );
}
