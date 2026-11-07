import type { EpicId } from "@/content/types";

const LAND = {
  fill: "var(--paper)",
  stroke: "var(--ink)",
  strokeWidth: 4,
  strokeLinejoin: "round" as const,
};

const RIVER = {
  fill: "none",
  stroke: "var(--accent)",
  strokeLinecap: "round" as const,
};

function MapLabel({ x, y, children, size = 20 }: { x: number; y: number; children: string; size?: number }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="var(--font-label), monospace"
      fontWeight="700"
      fontSize={size}
      letterSpacing="3"
      fill="var(--ink)"
      opacity="0.75"
    >
      {children}
    </text>
  );
}

function Mediterranean() {
  return (
    <g>
      <rect width="1000" height="700" fill="var(--accent)" />
      {/* Southern Europe, Italy, the Balkans and Greece */}
      <polygon
        {...LAND}
        points="0,0 0,95 70,60 148,70 215,120 285,190 340,227 395,290 407,350 432,310 462,290 500,262 455,225 407,184 340,120 285,70 270,26 330,40 395,125 470,170 537,219 548,290 590,362 648,415 665,370 703,350 670,300 667,236 720,245 778,219 830,225 889,210 900,170 1000,170 1000,0"
      />
      {/* Anatolia */}
      <polygon
        {...LAND}
        points="1000,205 910,225 850,240 785,267 800,300 815,332 833,394 880,410 952,402 1000,433"
      />
      {/* North Africa */}
      <polygon
        {...LAND}
        points="0,402 110,385 222,394 205,450 185,529 296,573 390,640 481,678 556,608 630,573 703,612 800,630 926,647 1000,640 1000,700 0,700"
      />
      <polygon {...LAND} points="278,350 393,341 374,407 278,367" />
      <polygon {...LAND} points="119,225 174,232 167,302 126,306" />
      <polygon {...LAND} points="133,100 167,100 159,170 137,170" />
      <polygon {...LAND} points="689,455 789,472 785,485 689,476" />
      <MapLabel x={860} y={80}>BLACK SEA COASTS</MapLabel>
      <MapLabel x={650} y={510}>MEDITERRANEAN</MapLabel>
      <MapLabel x={150} y={650}>AFRICA</MapLabel>
      <MapLabel x={150} y={40}>EUROPE</MapLabel>
    </g>
  );
}

function PlainOfTroy() {
  const ships = [130, 205, 280, 355, 430, 505, 580];
  const merlons = [745, 790, 835, 880, 925];
  return (
    <g>
      <rect width="1000" height="700" fill="var(--accent)" />
      <polygon {...LAND} points="84,700 84,64 1000,44 1000,700" />
      {/* Scamander and Simois */}
      <path {...RIVER} strokeWidth="26" d="M520 700 C 470 560, 380 470, 345 380 S 270 200, 280 58" />
      <path {...RIVER} strokeWidth="18" d="M1000 240 C 840 250, 700 180, 600 215 S 400 240, 322 262" />
      {/* Greek ships drawn up on the beach */}
      {ships.map((x) => (
        <polygon key={x} points={`${x - 26},68 ${x + 26},68 ${x + 14},88 ${x - 14},88`} fill="var(--ink)" />
      ))}
      {/* Greek wall */}
      <polyline
        points="104,146 640,146 660,76"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="7"
        strokeDasharray="22 10"
      />
      {/* Troy */}
      <g>
        {merlons.map((x) => (
          <rect key={x} x={x} y="394" width="26" height="24" fill="var(--ink)" />
        ))}
        <rect x="730" y="412" width="230" height="240" fill="var(--ramayana)" stroke="var(--ink)" strokeWidth="9" />
        <rect x="772" y="470" width="44" height="44" fill="var(--paper)" stroke="var(--ink)" strokeWidth="4" />
        <rect x="870" y="470" width="44" height="44" fill="var(--paper)" stroke="var(--ink)" strokeWidth="4" />
        <rect x="810" y="560" width="70" height="92" fill="var(--ink)" />
      </g>
      <MapLabel x={845} y={450} size={26}>TROY</MapLabel>
      <MapLabel x={530} y={38}>HELLESPONT</MapLabel>
      <MapLabel x={42} y={330} size={18}>AEGEAN</MapLabel>
      <MapLabel x={200} y={520}>R. SCAMANDER</MapLabel>
      <MapLabel x={830} y={210}>R. SIMOIS</MapLabel>
    </g>
  );
}

function SouthAsia() {
  return (
    <g>
      <rect width="1000" height="700" fill="var(--accent)" />
      <polygon
        {...LAND}
        points="287,0 234,104 153,181 207,239 247,290 308,337 335,430 362,495 399,570 434,620 470,585 508,493 562,397 679,311 727,259 794,246 820,181 1000,160 1000,0"
      />
      {/* Himalaya */}
      <polyline
        points="360,56 400,22 430,62 470,26 510,70 550,36 590,84 630,52 670,100 710,70 750,118 790,92 830,132"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="5"
      />
      {/* Ganga */}
      <path d="M520 78 C 540 130, 600 190, 680 210 S 740 240, 742 262" fill="none" stroke="var(--ink)" strokeWidth="3" strokeDasharray="10 7" />
      {/* Lanka */}
      <polygon {...LAND} points="515,606 570,618 596,664 566,690 526,684 506,644" />
      {/* The bridge */}
      <line x1="470" y1="585" x2="522" y2="622" stroke="var(--ink)" strokeWidth="9" strokeDasharray="10 6" />
      <MapLabel x={150} y={480}>ARABIAN SEA</MapLabel>
      <MapLabel x={760} y={480}>BAY OF BENGAL</MapLabel>
      <MapLabel x={700} y={40}>HIMALAYA</MapLabel>
      <MapLabel x={400} y={230}>BHARATA</MapLabel>
    </g>
  );
}

function KuruLands() {
  const trees = [
    [110, 170],
    [160, 150],
    [250, 170],
    [120, 245],
    [270, 255],
    [150, 320],
    [225, 330],
  ];
  return (
    <g>
      <rect width="1000" height="700" fill="var(--paper)" />
      {/* Himalaya */}
      <polygon
        points="260,0 260,60 320,110 380,60 450,130 520,70 600,160 680,80 770,180 850,90 930,170 1000,110 1000,0"
        fill="var(--ink)"
      />
      <polygon points="680,80 642,118 665,108 682,126 700,108 722,126" fill="var(--paper)" />
      <polygon points="850,90 815,128 838,118 855,134 875,118 892,132" fill="var(--paper)" />
      <polygon points="520,70 488,104 510,96 526,110 544,96 560,114" fill="var(--paper)" />
      {/* Yamuna */}
      <path {...RIVER} strokeWidth="24" d="M430 110 C 400 240, 450 340, 465 445 S 560 640, 660 700" />
      {/* Ganga */}
      <path {...RIVER} strokeWidth="32" d="M610 150 C 570 240, 570 320, 590 410 S 780 620, 1000 660" />
      {/* Kamyaka forest */}
      {trees.map(([x, y]) => (
        <polygon
          key={`${x}-${y}`}
          points={`${x},${y - 26} ${x + 20},${y + 10} ${x - 20},${y + 10}`}
          fill="var(--accent)"
          stroke="var(--ink)"
          strokeWidth="4"
        />
      ))}
      <MapLabel x={840} y={40} size={22}>
        HIMALAYA
      </MapLabel>
      <MapLabel x={810} y={490}>GANGA</MapLabel>
      <MapLabel x={570} y={590}>YAMUNA</MapLabel>
      <MapLabel x={110} y={400}>KURU LANDS</MapLabel>
    </g>
  );
}

const BACKDROPS: Record<EpicId, () => React.JSX.Element> = {
  odyssey: Mediterranean,
  iliad: PlainOfTroy,
  ramayana: SouthAsia,
  mahabharata: KuruLands,
};

export function MapBackdrop({ epic }: { epic: EpicId }) {
  const Backdrop = BACKDROPS[epic];
  return <Backdrop />;
}
