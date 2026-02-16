"use client";

export default function MascotCyclist({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-label="Maskot – kreslený cyklista"
      className="mascot-cyclist"
    >
      <style>{`
        .mascot-cyclist { animation: mascot-bob 2s ease-in-out infinite; }
        @keyframes mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .wheel-spin { animation: wheel-rotate 1.5s linear infinite; transform-origin: center; }
        @keyframes wheel-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* Back wheel */}
      <g className="wheel-spin" style={{ transformOrigin: "25px 78px" }}>
        <circle cx="25" cy="78" r="16" fill="none" stroke="#06B6D4" strokeWidth="3" />
        <circle cx="25" cy="78" r="2" fill="#06B6D4" />
        <line x1="25" y1="62" x2="25" y2="94" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
        <line x1="9" y1="78" x2="41" y2="78" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Front wheel */}
      <g className="wheel-spin" style={{ transformOrigin: "75px 78px" }}>
        <circle cx="75" cy="78" r="16" fill="none" stroke="#06B6D4" strokeWidth="3" />
        <circle cx="75" cy="78" r="2" fill="#06B6D4" />
        <line x1="75" y1="62" x2="75" y2="94" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
        <line x1="59" y1="78" x2="91" y2="78" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Frame */}
      <polygon points="25,78 50,55 75,78 50,68" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="50" y1="55" x2="50" y2="68" stroke="#0F172A" strokeWidth="2.5" />
      {/* Seat post */}
      <line x1="42" y1="52" x2="50" y2="55" stroke="#0F172A" strokeWidth="2.5" />
      {/* Handlebars */}
      <line x1="50" y1="55" x2="68" y2="50" stroke="#0F172A" strokeWidth="2.5" />
      <line x1="68" y1="46" x2="68" y2="54" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Seat */}
      <ellipse cx="40" cy="50" rx="6" ry="2.5" fill="#0F172A" />

      {/* Body */}
      <line x1="42" y1="50" x2="60" y2="38" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
      {/* Arms */}
      <line x1="55" y1="40" x2="68" y2="48" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
      {/* Legs - pedaling */}
      <line x1="44" y1="52" x2="38" y2="68" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="68" x2="25" y2="78" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="52" x2="50" y2="66" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="66" x2="50" y2="68" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />

      {/* Head */}
      <circle cx="62" cy="30" r="8" fill="#0D9488" />
      {/* Helmet */}
      <path d="M54 28 Q54 20 62 18 Q70 20 72 28 L72 30 Q68 27 62 27 Q56 27 54 30 Z" fill="#06B6D4" />
      {/* Eye */}
      <circle cx="65" cy="30" r="1.5" fill="white" />
      <circle cx="65.5" cy="30" r="0.8" fill="#0F172A" />
      {/* Smile */}
      <path d="M63 34 Q65 36 68 34" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
