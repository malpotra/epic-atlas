import { HeroArt } from "@/components/art/HeroArt";
import { epics } from "@/content";

const NAMES = [
  "Odysseus",
  "Sita",
  "Achilles",
  "Arjuna",
  "Penelope",
  "Hanuman",
  "Hector",
  "Draupadi",
  "Circe",
  "Ravana",
  "Krishna",
  "Andromache",
  "Rama",
  "Karna",
];

function MarqueeCopy({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0">
      {NAMES.map((name) => (
        <li key={name} className="flex items-center px-4 py-2 font-display text-lg uppercase">
          {name}
          <span aria-hidden="true" className="ml-8">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Hero() {
  const stops = epics.reduce((total, epic) => total + epic.episodes.length, 0);

  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <div>
          <p className="mb-5 inline-block border-4 border-ink bg-ramayana px-3 py-1 font-mono text-sm font-bold uppercase shadow-[3px_3px_0_var(--ink)]">
            Greece + India
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl uppercase leading-[0.95] sm:text-7xl xl:text-8xl"
          >
            Four epics.
            <br />
            <span className="bg-iliad px-2 [box-decoration-break:clone]">One map.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg sm:text-xl">
            Sail with Odysseus, stand on the plain of Troy, cross the ocean with Rama, and march to
            Kurukshetra. Follow the world&rsquo;s oldest stories, one stop at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#atlas" className="brut-btn bg-odyssey px-6 py-4 text-lg uppercase">
              Open the atlas ↓
            </a>
            <p className="font-mono text-sm font-bold uppercase">
              {epics.length} epics · {stops} stops
            </p>
          </div>
        </div>
        <div className="brut-card mx-auto w-full max-w-xl overflow-hidden shadow-[10px_10px_0_var(--ink)]">
          <HeroArt />
        </div>
      </div>

      <div className="overflow-hidden border-y-4 border-ink bg-mahabharata">
        <div className="marquee-track">
          <MarqueeCopy />
          <MarqueeCopy hidden />
        </div>
      </div>
    </section>
  );
}
