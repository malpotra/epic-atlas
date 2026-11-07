const INK = "var(--ink)";
const PAPER = "var(--paper)";
const STROKE = { stroke: INK, strokeWidth: 5, strokeLinejoin: "miter" as const };

function Ship() {
  return (
    <g>
      <rect width="300" height="300" fill="var(--odyssey)" />
      <circle cx="232" cy="66" r="32" fill="var(--ramayana)" {...STROKE} />
      <g className="art-bob">
        <line x1="150" y1="50" x2="150" y2="200" {...STROKE} />
        <polygon points="88,68 212,68 200,166 100,166" fill={PAPER} {...STROKE} />
        <polygon points="118,68 136,68 134,166 112,166" fill="var(--iliad)" {...STROKE} />
        <polygon points="164,68 182,68 188,166 166,166" fill="var(--iliad)" {...STROKE} />
        <polygon points="44,190 262,190 226,240 76,240" fill={INK} {...STROKE} />
        <polygon points="262,190 284,150 270,190" fill={INK} {...STROKE} />
        <polygon points="44,190 22,160 58,190" fill={INK} {...STROKE} />
        <circle cx="98" cy="212" r="8" fill={PAPER} />
      </g>
      <polyline
        points="-5,258 25,238 55,258 85,238 115,258 145,238 175,258 205,238 235,258 265,238 305,262"
        fill="none"
        {...STROKE}
      />
      <polyline
        points="-5,288 25,268 55,288 85,268 115,288 145,268 175,288 205,268 235,288 265,268 305,292"
        fill="none"
        {...STROKE}
      />
    </g>
  );
}

function Horse() {
  return (
    <g transform="translate(300 0)">
      <rect width="300" height="300" fill="var(--iliad)" />
      <rect y="262" width="300" height="38" fill={INK} />
      <polygon points="62,108 196,108 196,190 62,190" fill="var(--ramayana)" {...STROKE} />
      <polygon points="168,108 196,108 228,40 196,28 170,60" fill="var(--ramayana)" {...STROKE} />
      <polygon points="182,22 238,30 262,62 228,72 196,52" fill="var(--ramayana)" {...STROKE} />
      <polygon points="184,22 196,4 204,26" fill="var(--ramayana)" {...STROKE} />
      <circle cx="222" cy="44" r="5" fill={INK} />
      <polyline points="172,62 156,76 166,92 150,106" fill="none" {...STROKE} />
      <polyline points="62,112 34,128 40,178" fill="none" stroke={INK} strokeWidth="9" />
      <rect x="74" y="190" width="22" height="46" fill="var(--ramayana)" {...STROKE} />
      <rect x="164" y="190" width="22" height="46" fill="var(--ramayana)" {...STROKE} />
      <rect x="98" y="128" width="58" height="42" fill={INK} />
      <line x1="62" y1="150" x2="98" y2="150" {...STROKE} />
      <line x1="156" y1="150" x2="196" y2="150" {...STROKE} />
      <rect x="46" y="234" width="166" height="20" fill={PAPER} {...STROKE} />
      <circle cx="78" cy="262" r="17" fill={PAPER} {...STROKE} />
      <circle cx="180" cy="262" r="17" fill={PAPER} {...STROKE} />
    </g>
  );
}

function Bridge() {
  const stones = [
    [20, 196, 58],
    [88, 182, 52],
    [148, 170, 50],
    [206, 158, 46],
    [38, 228, 52],
    [100, 214, 50],
    [158, 202, 50],
    [216, 190, 46],
  ];
  return (
    <g transform="translate(0 300)">
      <rect width="300" height="300" fill="var(--ramayana)" />
      <circle cx="58" cy="62" r="32" fill="var(--iliad)" {...STROKE} />
      <polygon points="-6,306 -6,244 72,238 110,306" fill={PAPER} {...STROKE} />
      <polygon points="214,148 306,84 306,214 246,206" fill={PAPER} {...STROKE} />
      <line x1="270" y1="120" x2="270" y2="42" {...STROKE} />
      <polygon points="270,42 228,62 270,72" fill="var(--mahabharata)" {...STROKE} />
      <polygon points="270,42 306,58 270,72" fill="var(--mahabharata)" {...STROKE} />
      {stones.map(([x, y, width]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={width} height="30" fill="var(--odyssey)" {...STROKE} />
      ))}
      <polyline points="110,282 134,266 158,282 182,266 206,282 230,266 254,282 278,266 304,282" fill="none" {...STROKE} />
    </g>
  );
}

function Chariot() {
  const spokes = [0, 45, 90, 135];
  return (
    <g transform="translate(300 300)">
      <rect width="300" height="300" fill="var(--mahabharata)" />
      <rect y="256" width="300" height="44" fill={INK} />
      <line x1="84" y1="112" x2="84" y2="24" {...STROKE} />
      <polygon points="84,24 146,42 84,60" fill="var(--iliad)" {...STROKE} />
      <polygon points="44,112 132,112 148,202 34,202" fill="var(--odyssey)" {...STROKE} />
      <line x1="146" y1="178" x2="208" y2="166" stroke={INK} strokeWidth="9" />
      <polygon points="194,116 262,116 262,172 194,172" fill={PAPER} {...STROKE} />
      <polygon points="248,120 266,62 292,86 280,126" fill={PAPER} {...STROKE} />
      <polygon points="262,62 296,76 300,100 280,100" fill={PAPER} {...STROKE} />
      <rect x="202" y="172" width="16" height="84" fill={PAPER} {...STROKE} />
      <rect x="240" y="172" width="16" height="84" fill={PAPER} {...STROKE} />
      <g className="art-spin">
        <circle cx="92" cy="208" r="50" fill={PAPER} {...STROKE} />
        {spokes.map((angle) => (
          <line
            key={angle}
            x1="42"
            y1="208"
            x2="142"
            y2="208"
            transform={`rotate(${angle} 92 208)`}
            {...STROKE}
          />
        ))}
        <circle cx="92" cy="208" r="10" fill={INK} />
      </g>
    </g>
  );
}

function Bow() {
  return (
    <g>
      <circle cx="300" cy="300" r="88" fill={PAPER} stroke={INK} strokeWidth="6" />
      <path d="M264 234 Q 356 300 264 366" fill="none" stroke={INK} strokeWidth="11" />
      <line x1="264" y1="234" x2="264" y2="366" stroke={INK} strokeWidth="3" />
      <line x1="238" y1="300" x2="352" y2="300" stroke={INK} strokeWidth="5" />
      <polygon points="372,300 346,286 346,314" fill="var(--iliad)" stroke={INK} strokeWidth="4" />
      <polygon points="238,290 256,300 238,310 226,310 238,300 226,290" fill="var(--odyssey)" stroke={INK} strokeWidth="3" />
    </g>
  );
}

export function HeroArt() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="block h-auto w-full"
      role="img"
      aria-label="Four illustrated panels: a ship at sea, a wooden horse on wheels, a stone bridge across the ocean and a war chariot, with a drawn bow at the centre."
    >
      <Ship />
      <Horse />
      <Bridge />
      <Chariot />
      <line x1="300" y1="0" x2="300" y2="600" stroke={INK} strokeWidth="6" />
      <line x1="0" y1="300" x2="600" y2="300" stroke={INK} strokeWidth="6" />
      <Bow />
    </svg>
  );
}
