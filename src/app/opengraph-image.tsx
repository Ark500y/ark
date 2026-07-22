import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ARK — Abdul Rehman | AI Web Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050508',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)',
          }}
        />
        {/* Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: '120px',
            fontWeight: '900',
            letterSpacing: '-6px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          ARK
        </div>

        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '40px', fontWeight: '700', letterSpacing: '-1px', marginBottom: '16px' }}>
          Abdul Rehman
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '24px', fontWeight: '400' }}>
          AI Web Designer · Creative Frontend Engineer · Pakistan 🇵🇰
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #3b82f6, #7c3aed, #06b6d4)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
