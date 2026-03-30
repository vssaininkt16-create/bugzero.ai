import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#000d1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,191,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.04) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(0,191,255,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo mark + name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 36,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              background: 'rgba(0,191,255,0.08)',
              border: '3px solid #00BFFF',
              borderRadius: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#00BFFF', fontSize: 52, fontWeight: 900, lineHeight: 1 }}>B</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1,
              }}
            >
              BugZero
            </span>
            <span
              style={{
                color: '#00BFFF',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 5,
                marginTop: 2,
              }}
            >
              CYBER SOLUTIONS
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: '#CBD5E1',
            fontSize: 30,
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: 760,
            lineHeight: 1.5,
            zIndex: 1,
          }}
        >
          Securing India's Digital Future
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 2,
            background: '#00BFFF',
            margin: '28px auto',
            borderRadius: 2,
            zIndex: 1,
          }}
        />

        {/* Service tags */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 900,
            zIndex: 1,
          }}
        >
          {['VAPT', 'Pen Testing', 'Cloud Security', 'Bug Bounty', 'DPIIT Recognized'].map((s) => (
            <div
              key={s}
              style={{
                background: 'rgba(0,191,255,0.08)',
                border: '1px solid rgba(0,191,255,0.35)',
                borderRadius: 24,
                padding: '9px 22px',
                color: '#00BFFF',
                fontSize: 17,
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            color: 'rgba(148,163,184,0.7)',
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: 1,
            zIndex: 1,
          }}
        >
          bugzero.solutions
        </div>

        {/* Corner accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle at bottom right, rgba(0,191,255,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
