// GPS Tracking — přechodová zóna mezi hero a sloganem
// Čistá SVG animace, žádný JS runtime, žádné filtry ani blur

const PROFILE_PATH =
  "M30,185 C50,178 70,162 97,168 C115,172 145,144 187,140 " +
  "C215,137 235,120 254,117 C268,114 282,104 301,100 " +
  "C318,96 332,90 345,87 C353,84 360,82 366,82 " +
  "C375,82 385,87 400,92 C418,98 445,112 478,114 " +
  "C493,115 510,130 522,132 C535,133 550,137 567,137 " +
  "C575,137 582,132 590,130 C608,124 635,115 657,114 " +
  "C672,112 690,105 703,102 C713,99 719,94 726,94 " +
  "C740,92 755,90 770,90 C778,90 783,90 791,92 " +
  "C808,97 822,107 836,110 C850,114 866,122 881,126 " +
  "C896,130 912,140 926,144 C935,147 943,154 948,158 " +
  "C956,164 965,174 970,177";

const FILL_PATH = `${PROFILE_PATH} L970,185 L30,185 Z`;

// 12 keyframe hodnoty (1 frame = 1s, cycle = 12s)
// Pozice na trase: 0, 0.35, 0.7, 1.1, 1.5, 2.0, 2.4, 2.8, 3.1, 3.3, 3.7, 4.0 km
const BPM_VALUES   = [145, 158, 172, 180, 185, 168, 155, 170, 178, 183, 172, 160];
const WATTS_VALUES = [185, 280, 350, 400, 420, 280, 200, 350, 390, 415, 320, 235];
const KMH_VALUES   = [ 26,  19,  17,  15,  14,  22,  28,  18,  15,  14,  16,  22];
const ELEV_VALUES  = [385, 405, 430, 455, 472, 435, 415, 445, 465, 470, 450, 415];
const GRADE_VALUES = ["+2","+6","+8","+9","+10","-8","-3","+7","+9","+10","-5","-12"];

const BPM_COLORS   = ["#f87171","#ef4444","#ef4444","#dc2626","#dc2626","#ef4444","#f87171","#ef4444","#dc2626","#dc2626","#ef4444","#f87171"];
const WATTS_COLORS = ["#f59e0b","#f59e0b","#f59e0b","#dc2626","#dc2626","#84cc16","#84cc16","#f59e0b","#dc2626","#dc2626","#f59e0b","#84cc16"];

function frameKeyTimes(i: number): string {
  const n = 12;
  const s = i / n;
  const e = (i + 1) / n;
  if (i === 0)     return `0;${e.toFixed(4)};${(e + 0.0001).toFixed(4)};1`;
  if (i === n - 1) return `0;${(s - 0.0001).toFixed(4)};${s.toFixed(4)};1`;
  return `0;${(s - 0.0001).toFixed(4)};${s.toFixed(4)};${e.toFixed(4)};${(e + 0.0001).toFixed(4)};1`;
}

function frameOpacities(i: number): string {
  const n = 12;
  if (i === 0)     return "1;1;0;0";
  if (i === n - 1) return "0;0;1;1";
  return "0;0;1;1;0;0";
}

function MetricValues({
  values,
  colors,
  x,
  y,
  fontSize = 16,
}: {
  values: (number | string)[];
  colors?: string[];
  x: number;
  y: number;
  fontSize?: number;
}) {
  return (
    <>
      {values.map((val, i) => (
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          fontFamily="monospace"
          fontSize={fontSize}
          fontWeight="500"
          fill={colors?.[i] ?? "#2dd4bf"}
        >
          {String(val)}
          <animate
            attributeName="opacity"
            values={frameOpacities(i)}
            keyTimes={frameKeyTimes(i)}
            dur="12s"
            repeatCount="indefinite"
            calcMode="discrete"
          />
        </text>
      ))}
    </>
  );
}

export default function GpsTrackingSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ contain: "layout style", willChange: "transform" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 220"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        style={{ height: "clamp(160px, 20vw, 220px)" }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gps-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="55%" stopColor="#1a2332" />
            <stop offset="100%" stopColor="#0f2a2a" />
          </linearGradient>
          <linearGradient id="gps-elev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Pozadí */}
        <rect width="1000" height="220" fill="url(#gps-bg)" />

        {/* EKG dekorativní čára (vlevo dole, za elevation fill) */}
        <polyline
          points="30,180 34,180 36,175 38,180 40,165 42,184 44,175 46,180 50,180 54,175 56,180 58,165 60,184 62,175 64,180 68,180 72,175 74,180 76,165 78,184 80,175 82,180 90,180"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeOpacity="0.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Výplň pod profilem */}
        <path d={FILL_PATH} fill="url(#gps-elev)" />

        {/* Čára profilu */}
        <path
          d={PROFILE_PATH}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* KM značky */}
        <line x1="254" y1="62" x2="254" y2="185" stroke="#14b8a6" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3,4" />
        <text x="254" y="198" textAnchor="middle" fontSize="9" fill="#5eead4" opacity="0.45" fontFamily="monospace">1 KM</text>
        <line x1="478" y1="62" x2="478" y2="185" stroke="#14b8a6" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3,4" />
        <text x="478" y="198" textAnchor="middle" fontSize="9" fill="#5eead4" opacity="0.45" fontFamily="monospace">2 KM</text>
        <line x1="703" y1="62" x2="703" y2="185" stroke="#14b8a6" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3,4" />
        <text x="703" y="198" textAnchor="middle" fontSize="9" fill="#5eead4" opacity="0.45" fontFamily="monospace">3 KM</text>
        <line x1="926" y1="62" x2="926" y2="185" stroke="#14b8a6" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3,4" />
        <text x="926" y="198" textAnchor="middle" fontSize="9" fill="#5eead4" opacity="0.45" fontFamily="monospace">4 KM</text>

        {/* Watermark */}
        <text x="968" y="70" textAnchor="end" fontSize="8" fill="#5eead4" opacity="0.35" fontFamily="monospace">
          STUPNO XCO 2026 · UCI C1 · 4.2 KM LOOP
        </text>

        {/* BPM — vždy viditelný */}
        <rect x="20" y="8" width="110" height="40" rx="4" fill="#111827" fillOpacity="0.85" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.3" />
        <text x="75" y="20" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#5eead4" opacity="0.6">BPM</text>
        <MetricValues values={BPM_VALUES} colors={BPM_COLORS} x={75} y={38} fontSize={16} />

        {/* WATTS — vždy viditelný */}
        <rect x="140" y="8" width="110" height="40" rx="4" fill="#111827" fillOpacity="0.85" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.3" />
        <text x="195" y="20" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#5eead4" opacity="0.6">WATTS</text>
        <MetricValues values={WATTS_VALUES} colors={WATTS_COLORS} x={195} y={38} fontSize={16} />

        {/* KM/H — vždy viditelný */}
        <rect x="260" y="8" width="100" height="40" rx="4" fill="#111827" fillOpacity="0.85" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.3" />
        <text x="310" y="20" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#5eead4" opacity="0.6">KM/H</text>
        <MetricValues values={KMH_VALUES} x={310} y={38} fontSize={16} />

        {/* ELEV — tablet a desktop */}
        <g className="hidden md:block">
          <rect x="370" y="8" width="85" height="40" rx="4" fill="#111827" fillOpacity="0.85" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="412" y="20" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#5eead4" opacity="0.6">ELEV</text>
          <MetricValues values={ELEV_VALUES.map((v) => `${v}m`)} x={412} y={38} fontSize={14} />
        </g>

        {/* GRADE — pouze desktop */}
        <g className="hidden lg:block">
          <rect x="465" y="8" width="90" height="40" rx="4" fill="#111827" fillOpacity="0.85" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="510" y="20" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="#5eead4" opacity="0.6">GRADE %</text>
          <MetricValues values={GRADE_VALUES} x={510} y={38} fontSize={16} />
        </g>

        {/* Pulzující kruh (GPS ping) */}
        <circle r="10" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.15">
          <animateMotion dur="12s" repeatCount="indefinite" path={PROFILE_PATH} rotate="auto" />
          <animate attributeName="r" values="8;18;8" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.15;0;0.15" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Hlavní bod */}
        <circle r="6" fill="#2dd4bf">
          <animateMotion dur="12s" repeatCount="indefinite" path={PROFILE_PATH} rotate="auto" />
        </circle>

        {/* Světlý střed bodu */}
        <circle r="2.5" fill="white" fillOpacity="0.7">
          <animateMotion dur="12s" repeatCount="indefinite" path={PROFILE_PATH} rotate="auto" />
        </circle>
      </svg>
    </section>
  );
}
