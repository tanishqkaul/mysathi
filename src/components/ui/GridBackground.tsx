import * as React from 'react';
import { imgGridLines } from './svg-gridmask';

const mask1: React.CSSProperties = {
  maskImage: `url('${imgGridLines}')`,
  maskMode: 'alpha',
  maskComposite: 'intersect',
  maskClip: 'no-clip' as React.CSSProperties['maskClip'],
  maskRepeat: 'no-repeat',
  maskPosition: '-372.132px -238.634px',
  maskSize: '2066.317px 1761.949px',
};

const mask2: React.CSSProperties = {
  maskImage: `url('${imgGridLines}')`,
  maskMode: 'alpha',
  maskComposite: 'intersect',
  maskClip: 'no-clip' as React.CSSProperties['maskClip'],
  maskRepeat: 'no-repeat',
  maskPosition: '-425.769px -444.562px',
  maskSize: '2066.317px 1761.949px',
};

export function GridBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '20.125rem' }}>
      {/* 960×322 grid visual — absolute so it never affects layout width */}
      <div
        className="absolute overflow-hidden rounded-[16px] border border-[#e3e3e3] opacity-60"
        style={{ width: 960, height: 322, left: '50%', top: 0, transform: 'translateX(-50%)' }}
      >
        {/* Large 1440px grid container offset to centre inside 960px frame */}
        <div className="absolute overflow-hidden" style={{ left: -325.5, top: -81, width: 1440, height: 1024 }}>

          {/* ── Grid lines (blob-masked) ── */}
          <div className="absolute" style={{ left: -184.28, top: -253.41, width: 2011.428, height: 1572.202, ...mask1 }}>

            {/* Horizontal lines rendered rotated as "hori lines" */}
            <div className="absolute flex items-center justify-center" style={{ left: 51.99, top: 6.32, width: 1775.062, height: 1533.008 }}>
              <div style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                <div className="relative" style={{ width: 1533.008, height: 1775.062 }}>
                  <div className="absolute" style={{ inset: '0 -2.06% 0 0' }}>
                    <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 1564.53 1775.06">
                      <g>
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="30.8882"  x2="30.8881"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="676.365"  x2="676.365"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="353.626"  x2="353.626"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="999.101"  x2="999.101"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1321.84"  x2="1321.84"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="192.255"  x2="192.255"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="837.734"  x2="837.734"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="514.996"  x2="514.996"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1160.47"  x2="1160.47"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1483.21"  x2="1483.21"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="111.572"  x2="111.572"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="757.048"  x2="757.048"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="434.31"   x2="434.31"   y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1079.79"  x2="1079.79"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1402.53"  x2="1402.53"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="272.941"  x2="272.941"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="918.419"  x2="918.419"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="595.679"  x2="595.679"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1241.16"  x2="1241.16"  y1="0" y2="1511.58" />
                        <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1563.9"   x2="1563.9"   y1="0" y2="1511.58" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical lines */}
            <div className="absolute" style={{ left: 98.63, top: 189.12, width: 1533.008, height: 1167.406 }}>
              <svg className="absolute inset-0" style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 1534.27 1167.41">
                <g>
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="0.6304"   x2="0.6303"   y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="646.111"  x2="646.111"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="323.371"  x2="323.371"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="968.847"  x2="968.847"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1291.59"  x2="1291.59"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="162.001"  x2="162.001"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="807.476"  x2="807.476"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="484.742"  x2="484.742"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1130.22"  x2="1130.22"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1452.96"  x2="1452.96"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="81.3177"  x2="81.3176"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="726.794"  x2="726.794"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="404.054"  x2="404.054"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1049.53"  x2="1049.53"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1372.27"  x2="1372.27"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="242.687"  x2="242.687"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="888.164"  x2="888.164"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="565.423"  x2="565.423"  y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1210.9"   x2="1210.9"   y1="0" y2="1167.41" />
                  <line opacity="0.7" stroke="#FBCFFB" strokeWidth="1.2607" x1="1533.64"  x2="1533.64"  y1="0" y2="1167.41" />
                </g>
              </svg>
            </div>
          </div>

          {/* ── Grid colour blocks (blob-masked) ── */}
          <div className="absolute opacity-70" style={{ left: -130.65, top: -47.49, width: 1462.338, height: 1003.783, ...mask2 }}>
            <div className="absolute bg-[#f68df6]"  style={{ left: 852.53, top: 818.35, width: 80.226, height: 80.226 }} />
            <div className="absolute bg-[#e156e1]"  style={{ left: 449.11, top: 818.35, width: 80.226, height: 80.226 }} />
            <div className="absolute bg-[#9f269f] opacity-[0.13]" style={{ left: 1336.73, top: 254.47, width: 80.226, height: 79.08 }} />
            <div className="absolute bg-[#f9bef9] opacity-20" style={{ left: 450.33,  top: 173.24, width: 80.226, height: 79.08 }} />
            <div className="absolute bg-[#791a79] opacity-20" style={{ left: 1256.36, top: 334.7,  width: 80.226, height: 79.08 }} />
            <div className="absolute bg-[#e156e1] opacity-10" style={{ left: 368.96,  top: 253.47, width: 80.226, height: 79.08 }} />
            <div className="absolute bg-[#f8b1f8] opacity-30" style={{ left: 1256.36, top: 254.47, width: 80.226, height: 79.08 }} />
            <div className="absolute bg-[#c530c5] opacity-20" style={{ left: 368.96,  top: 173.24, width: 80.226, height: 79.08 }} />
            <div className="absolute bg-[#e156e1]"  style={{ left: 368.88, top: 818.35, width: 80.226, height: 80.226 }} />
            <div className="absolute bg-[#e156e1]"  style={{ left: 368.88, top: 898.57, width: 80.226, height: 81.372 }} />
            <div className="absolute bg-[#e156e1]"  style={{ left: 207.28, top: 738.12, width: 80.226, height: 80.226 }} />
            {/* top group */}
            <div className="absolute opacity-30" style={{ left: 933.9, top: 1.18, width: 160.452, height: 171.913 }}>
              <div className="absolute bg-[#f68df6] opacity-50" style={{ left: 80.23, top: 91.69, width: 80.226, height: 80.226 }} />
              <div className="absolute bg-[#f68df6]"            style={{ left: 0,     top: 0,     width: 80.226, height: 80.226 }} />
              <div className="absolute bg-[#f68df6]"            style={{ left: -0.88, bottom: 0,  width: 80.226, height: 81.372 }} />
            </div>
            {/* top-left group */}
            <div className="absolute" style={{ left: 120.18, top: 85.99, width: 160.452, height: 171.913 }}>
              <div className="absolute bg-[#fdeffd]" style={{ left: 87.1,   top: 85.96,  width: 81.372, height: 82.518 }} />
              <div className="absolute bg-[#fdeffd]" style={{ left: 5.73,   top: 5.73,   width: 81.372, height: 80.226 }} />
              <div className="absolute bg-[#fdeffd]" style={{ left: -74.5,  top: 6.88,   width: 81.372, height: 80.226 }} />
              <div className="absolute bg-[#fdeffd]" style={{ left: 5.73,   top: 85.96,  width: 81.372, height: 82.518 }} />
              <div className="absolute bg-[#f8b1f8]" style={{ left: 328.93, top: -74.5,  width: 81.372, height: 80.226 }} />
              <div className="absolute bg-[#fdeffd]" style={{ left: 87.1,   top: 247.55, width: 80.226, height: 81.372 }} />
              <div className="absolute bg-[#f8b1f8]" style={{ left: 1055.55, top: 652.13, width: 80.226, height: 80.226 }} />
              <div className="absolute bg-[#f8b1f8]" style={{ left: 1135.77, top: 732.35, width: 80.226, height: 80.226 }} />
            </div>
          </div>
        </div>

        {/* ── Unmasked corner blocks (positioned in 960px space) ── */}
        <div className="absolute bg-[#f9bef9] opacity-20" style={{ left: 236.19, top: 45.76,  width: 80.226, height: 79.08 }} />
        <div className="absolute bg-[#f9bef9] opacity-10" style={{ left: 154.82, top: 125.98, width: 80.226, height: 79.08 }} />
        <div className="absolute bg-[#fbcffb] opacity-50" style={{ left: 154.82, top: 45.76,  width: 80.226, height: 79.08 }} />
      </div>

      {/* Children — absolute overlay at full opacity */}
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}
