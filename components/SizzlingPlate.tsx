const SISIG: Array<[number, number, number, number, number, string]> = [
  [268, 330, 30, 22, -18, "#7a4526"],
  [300, 312, 26, 20, 12, "#8f5129"],
  [338, 300, 32, 22, -6, "#5a3320"],
  [374, 306, 24, 18, 22, "#9a5a2e"],
  [410, 320, 30, 24, -14, "#6b3c24"],
  [446, 342, 26, 20, 10, "#7f4a28"],
  [250, 362, 24, 18, 6, "#63381f"],
  [282, 352, 34, 24, -8, "#8a4c28"],
  [322, 340, 28, 20, 16, "#a26234"],
  [360, 336, 34, 26, -12, "#6e3f23"],
  [398, 346, 26, 20, 8, "#b0703c"],
  [432, 366, 30, 22, -20, "#7d4726"],
  [462, 386, 22, 18, 14, "#5e3520"],
  [246, 396, 26, 20, -10, "#8f5229"],
  [280, 388, 30, 22, 18, "#653a22"],
  [318, 378, 26, 20, -16, "#9a5b30"],
  [354, 372, 32, 24, 6, "#7a4627"],
  [392, 382, 28, 22, -8, "#5f3620"],
  [424, 400, 26, 20, 20, "#a86636"],
  [268, 428, 24, 18, 12, "#b0703c"],
  [304, 416, 30, 22, -18, "#724224"],
  [342, 410, 28, 20, 8, "#8a4f2a"],
  [378, 414, 26, 20, -6, "#5a3320"],
  [408, 434, 22, 18, 16, "#7d4726"],
  [330, 448, 26, 18, -12, "#6b3c24"],
  [362, 446, 22, 16, 10, "#9a5b30"],
  [292, 452, 20, 16, 22, "#8f5229"],
];

const BITS: Array<[number, number, number, number, number, string]> = [
  [292, 336, 18, 8, 24, "#e6d7bd"],
  [360, 322, 16, 8, -12, "#e6d7bd"],
  [404, 366, 18, 8, 18, "#e6d7bd"],
  [316, 402, 16, 8, -20, "#e6d7bd"],
  [352, 420, 18, 8, 8, "#e6d7bd"],
  [336, 356, 14, 8, 32, "#d8b98f"],
  [382, 392, 16, 8, -18, "#d8b98f"],
  [300, 372, 12, 8, 12, "#d8b98f"],
  [282, 410, 12, 12, 0, "#b2372c"],
  [396, 336, 12, 12, 0, "#b2372c"],
  [368, 436, 10, 10, 0, "#b2372c"],
  [308, 330, 14, 7, -24, "#7f9a4e"],
  [346, 392, 14, 7, 16, "#7f9a4e"],
  [418, 388, 13, 7, -8, "#7f9a4e"],
  [270, 380, 12, 7, 26, "#7f9a4e"],
  [330, 440, 12, 7, -14, "#7f9a4e"],
  [322, 358, 10, 9, 20, "#2f2118"],
  [390, 372, 11, 9, -12, "#2f2118"],
  [288, 424, 10, 8, 8, "#2f2118"],
  [374, 424, 10, 8, -18, "#2f2118"],
];

export function SizzlingPlate({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 700"
      className={className}
      role="img"
      aria-label="A cast-iron plate of pork sisig with a fried egg, still sizzling"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>A cast-iron plate of pork sisig with a fried egg, still sizzling</title>
      <defs>
        <radialGradient id="plate-metal" cx="38%" cy="30%" r="78%">
          <stop offset="0" stopColor="#3b352d" />
          <stop offset="0.55" stopColor="#252019" />
          <stop offset="1" stopColor="#14110e" />
        </radialGradient>
        <linearGradient id="plate-rim" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#4b443a" />
          <stop offset="0.5" stopColor="#2a251f" />
          <stop offset="1" stopColor="#1b1713" />
        </linearGradient>
        <radialGradient id="plate-well" cx="42%" cy="34%" r="72%">
          <stop offset="0" stopColor="#3a2a1c" />
          <stop offset="0.55" stopColor="#241a12" />
          <stop offset="1" stopColor="#19120d" />
        </radialGradient>
        <radialGradient id="plate-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d98a4a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#d98a4a" stopOpacity="0" />
        </radialGradient>
        <filter id="plate-blur-30" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="plate-blur-12" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="plate-blur-4" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <ellipse cx="350" cy="382" rx="296" ry="286" fill="#000000" opacity="0.5" filter="url(#plate-blur-30)" />

      <g fill="url(#plate-metal)" stroke="#0d0b09" strokeWidth="2">
        <rect x="28" y="316" width="62" height="68" rx="16" />
        <rect x="610" y="316" width="62" height="68" rx="16" />
      </g>

      <circle cx="350" cy="350" r="290" fill="url(#plate-metal)" stroke="#0b0908" strokeWidth="2" />
      <circle cx="350" cy="350" r="290" fill="none" stroke="url(#plate-rim)" strokeWidth="42" />
      <circle cx="350" cy="350" r="268" fill="none" stroke="#000000" strokeOpacity="0.45" strokeWidth="3" />
      <circle cx="350" cy="350" r="252" fill="url(#plate-well)" />
      <circle cx="350" cy="350" r="252" fill="none" stroke="#000000" strokeOpacity="0.4" strokeWidth="12" filter="url(#plate-blur-4)" />

      <ellipse cx="318" cy="318" rx="176" ry="124" fill="url(#plate-warm)" filter="url(#plate-blur-12)" />
      <ellipse cx="286" cy="268" rx="118" ry="32" fill="#ffffff" opacity="0.06" filter="url(#plate-blur-12)" transform="rotate(-24 286 268)" />
      <ellipse cx="420" cy="436" rx="92" ry="24" fill="#ffffff" opacity="0.04" filter="url(#plate-blur-12)" transform="rotate(-16 420 436)" />

      <path
        d="M 62 350 A 288 288 0 0 1 638 350"
        fill="none"
        stroke="#f3e6d0"
        strokeOpacity="0.14"
        strokeWidth="5"
        filter="url(#plate-blur-4)"
      />

      <g fill="#0b0908" opacity="0.55">
        <circle cx="116" cy="485" r="5" />
        <circle cx="584" cy="485" r="4" />
        <circle cx="116" cy="215" r="4" />
        <circle cx="584" cy="215" r="6" />
        <circle cx="258" cy="96" r="4" />
        <circle cx="442" cy="96" r="5" />
      </g>

      <ellipse cx="350" cy="384" rx="150" ry="106" fill="#24160e" />
      <ellipse cx="346" cy="374" rx="126" ry="84" fill="#33200f" opacity="0.7" />

      <g stroke="#000000" strokeOpacity="0.16" strokeWidth="1">
        {SISIG.map(([x, y, width, height, rotation, fill], index) => (
          <rect
            key={`sisig-${index}`}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={5}
            fill={fill}
            transform={`rotate(${rotation} ${x + width / 2} ${y + height / 2})`}
          />
        ))}
      </g>

      <g stroke="#000000" strokeOpacity="0.12" strokeWidth="1">
        {BITS.map(([x, y, width, height, rotation, fill], index) => (
          <rect
            key={`bit-${index}`}
            x={x}
            y={y}
            width={width}
            height={height}
            rx={4}
            fill={fill}
            transform={`rotate(${rotation} ${x + width / 2} ${y + height / 2})`}
          />
        ))}
      </g>

      <ellipse cx="330" cy="332" rx="86" ry="42" fill="#ffffff" opacity="0.05" filter="url(#plate-blur-12)" />

      <g fill="#1b1109" opacity="0.75">
        <ellipse cx="232" cy="296" rx="7" ry="4" />
        <ellipse cx="486" cy="446" rx="6" ry="4" />
        <ellipse cx="300" cy="472" rx="5" ry="3" />
        <ellipse cx="236" cy="356" rx="4" ry="3" />
      </g>

      <g>
        <ellipse cx="464" cy="306" rx="50" ry="38" fill="#ece3cf" opacity="0.96" />
        <ellipse cx="446" cy="318" rx="38" ry="28" fill="#f2ead8" />
        <ellipse cx="478" cy="292" rx="30" ry="24" fill="#f2ead8" />
        <circle cx="462" cy="304" r="27" fill="#e7a23a" />
        <circle cx="462" cy="304" r="27" fill="none" stroke="#b9762a" strokeOpacity="0.45" strokeWidth="2" />
        <ellipse cx="452" cy="294" rx="8" ry="5" fill="#ffffff" opacity="0.4" />
      </g>

      <g transform="translate(238 474)">
        <circle r="27" fill="#7f9a4e" />
        <circle r="21" fill="#cbd68b" />
        <g stroke="#a9bb62" strokeWidth="1.5">
          <line x1="0" y1="-6" x2="0" y2="-20" />
          <line x1="5" y1="-3" x2="17" y2="-10" />
          <line x1="5" y1="3" x2="17" y2="10" />
          <line x1="0" y1="6" x2="0" y2="20" />
          <line x1="-5" y1="3" x2="-17" y2="10" />
          <line x1="-5" y1="-3" x2="-17" y2="-10" />
        </g>
        <circle r="5" fill="#eef0c8" />
      </g>

      <g transform="translate(292 492) rotate(18) scale(0.72)">
        <circle r="27" fill="#7f9a4e" />
        <circle r="21" fill="#cbd68b" />
        <circle r="6" fill="#eef0c8" />
      </g>

      <g fill="none" stroke="#f3e6d0" strokeLinecap="round" filter="url(#plate-blur-12)">
        <path
          d="M 318 306 C 298 262 336 234 316 188 C 302 156 326 128 316 96"
          strokeOpacity="0.1"
          strokeWidth="14"
        />
        <path
          d="M 372 300 C 356 252 392 224 376 176 C 364 142 388 116 378 84"
          strokeOpacity="0.09"
          strokeWidth="12"
        />
        <path d="M 282 320 C 266 286 296 262 282 224" strokeOpacity="0.07" strokeWidth="10" />
      </g>
    </svg>
  );
}
