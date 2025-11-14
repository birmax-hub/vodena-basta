"use client";

import { memo, useMemo } from "react";

const BASE_GRADIENT = `
  linear-gradient(135deg, #020c0d 0%, #041c19 28%, #081f2d 62%, #140d2a 100%)
`;

const OVERLAY_LAYERS = [
  {
    background: "radial-gradient(1800px 1400px at 12% -10%, rgba(61, 226, 198, 0.18) 0%, rgba(61, 226, 198, 0) 90%)",
    opacity: 1,
  },
  {
    background: "radial-gradient(1500px 1100px at 88% 6%, rgba(0, 198, 255, 0.18) 0%, rgba(0, 198, 255, 0) 88%)",
    opacity: 1,
  },
  {
    background: "radial-gradient(1400px 1100px at 48% 95%, rgba(172, 255, 210, 0.12) 0%, rgba(172, 255, 210, 0) 92%)",
    opacity: 1,
  },
  {
    background: "radial-gradient(1300px 900px at 64% 32%, rgba(255, 214, 51, 0.08) 0%, rgba(255, 214, 51, 0) 92%)",
    opacity: 1,
  },
];

const AURORA_SWEEPS = [
  {
    transform: "rotate(-12deg)",
    background:
      "conic-gradient(from 120deg at 30% 40%, rgba(71, 255, 209, 0.12), rgba(41, 123, 255, 0.08), transparent 70%)",
    blur: "180px",
  },
  {
    transform: "rotate(18deg)",
    background:
      "conic-gradient(from 240deg at 70% 55%, rgba(137, 255, 226, 0.1), rgba(120, 197, 255, 0.14), transparent 68%)",
    blur: "160px",
  },
];

function SceneBackgroundComponent() {
  const baseStyle = useMemo(
    () => ({
      backgroundImage: BASE_GRADIENT,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden style={baseStyle}>
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background: "radial-gradient(1200px 900px at 60% 40%, rgba(58, 205, 229, 0.18), transparent 75%)",
          animation: "auroraDrift 36s ease-in-out infinite alternate",
        }}
      />
      {OVERLAY_LAYERS.map((layer, index) => (
        <div
          key={`overlay-${index}`}
          className="absolute inset-0"
          style={{
            backgroundImage: layer.background,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: layer.opacity,
          }}
        />
      ))}

      {AURORA_SWEEPS.map((sweep, index) => (
        <div
          key={`sweep-${index}`}
          className="absolute inset-[-20%] rounded-[50%]"
          style={{
            background: sweep.background,
            filter: `blur(${sweep.blur})`,
            transform: sweep.transform,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
}

export const SceneBackground = memo(SceneBackgroundComponent);

export default SceneBackground;
