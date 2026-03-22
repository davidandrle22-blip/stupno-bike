function CyclistSVG({ variant = 0 }: { variant?: number }) {
  // 4 slightly different pedaling positions for variety
  const legs: Record<number, { d1: string; d2: string }> = {
    0: {
      d1: "M54,30 L50,40 L54,44 L58,38 L62,28 L56,26 Z",
      d2: "M54,30 L57,21 L62,19 L63,24 L58,32 Z",
    },
    1: {
      d1: "M54,30 L48,40 L53,44 L58,36 L64,26 L57,24 Z",
      d2: "M54,30 L60,22 L65,20 L65,25 L59,34 Z",
    },
    2: {
      d1: "M54,30 L51,41 L55,44 L59,38 L62,28 L56,26 Z",
      d2: "M54,30 L56,20 L60,18 L61,22 L57,30 Z",
    },
    3: {
      d1: "M54,30 L52,42 L56,44 L60,37 L63,28 L57,26 Z",
      d2: "M54,30 L55,19 L60,17 L61,22 L57,31 Z",
    },
  };
  const { d1, d2 } = legs[variant] ?? legs[0];

  return (
    <svg viewBox="0 0 90 56" fill="currentColor" aria-hidden="true" className="w-full h-full">
      {/* Wheels */}
      <circle cx="16" cy="43" r="12" />
      <circle cx="16" cy="43" r="5.5" fill="rgba(255,255,255,0.22)" />
      <circle cx="74" cy="43" r="12" />
      <circle cx="74" cy="43" r="5.5" fill="rgba(255,255,255,0.22)" />
      {/* Frame — strokes only */}
      <g
        stroke="currentColor"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="74" y1="43" x2="54" y2="30" />  {/* chainstay */}
        <line x1="54" y1="30" x2="52" y2="13" />  {/* seat tube */}
        <line x1="52" y1="13" x2="74" y2="43" />  {/* seat stay */}
        <line x1="54" y1="30" x2="24" y2="17" />  {/* down tube */}
        <line x1="52" y1="13" x2="24" y2="17" />  {/* top tube */}
        <line x1="24" y1="17" x2="16" y2="43" />  {/* fork */}
      </g>
      {/* Rider — filled shapes */}
      {/* Hips on saddle */}
      <ellipse cx="52" cy="11" rx="6" ry="4" transform="rotate(5,52,11)" />
      {/* Torso (leaning forward) */}
      <path d="M49,14 C44,14 37,10 32,8 L30,12 C35,17 43,18 49,17 Z" />
      {/* Arms to handlebars */}
      <path d="M32,8 L22,14 L20,18 L24,18 L34,12 Z" />
      {/* Head / helmet */}
      <circle cx="16" cy="6" r="7" />
      {/* Legs */}
      <path d={d1} />
      <path d={d2} />
    </svg>
  );
}

export default function CyclistDivider() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pointer-events-none"
      style={{ height: "140px" }}
      aria-hidden="true"
    >
      {/* White diagonal background */}
      <div
        className="absolute inset-0 bg-white"
        style={{ clipPath: "polygon(0 65%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      {/* Terrain silhouette line */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "75px" }}
        viewBox="0 0 1440 75"
        preserveAspectRatio="none"
      >
        <path
          d="M0,52 Q120,36 240,50 T480,40 T720,47 T960,34 T1200,44 T1440,38 L1440,75 L0,75Z"
          fill="rgba(14,165,233,0.05)"
        />
        <path
          d="M0,52 Q120,36 240,50 T480,40 T720,47 T960,34 T1200,44 T1440,38"
          fill="none"
          stroke="rgba(13,148,136,0.2)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Cyclist A — fastest, front */}
      <div
        className="absolute cyclist-a"
        style={{ bottom: "18px", color: "#0d9488", width: "72px", height: "45px" }}
      >
        <CyclistSVG variant={0} />
      </div>

      {/* Cyclist B — slightly slower */}
      <div
        className="absolute cyclist-b"
        style={{ bottom: "22px", color: "#0891b2", width: "80px", height: "50px" }}
      >
        <CyclistSVG variant={1} />
      </div>

      {/* Cyclist C — small, faster */}
      <div
        className="absolute cyclist-c"
        style={{ bottom: "15px", color: "#0f766e", width: "64px", height: "40px" }}
      >
        <CyclistSVG variant={2} />
      </div>

      {/* Cyclist D — slowest, back of group */}
      <div
        className="absolute cyclist-d"
        style={{ bottom: "20px", color: "#06b6d4", width: "58px", height: "36px" }}
      >
        <CyclistSVG variant={3} />
      </div>

      {/* Dust particles trailing last cyclist */}
      <div className="absolute cyclist-dust" style={{ bottom: "24px" }}>
        <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
          <circle cx="4"  cy="8" r="1.5" fill="#0d9488" opacity="0.5" />
          <circle cx="12" cy="5" r="1"   fill="#06b6d4" opacity="0.35" />
          <circle cx="20" cy="9" r="1.2" fill="#0d9488" opacity="0.25" />
          <circle cx="30" cy="4" r="0.8" fill="#06b6d4" opacity="0.15" />
          <circle cx="38" cy="7" r="0.7" fill="#0d9488" opacity="0.1" />
        </svg>
      </div>
    </div>
  );
}
