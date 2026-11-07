import type { Episode } from "@/content/types";

interface EpisodeCardProps {
  episode: Episode;
  index: number;
  total: number;
  onSelect: (index: number) => void;
}

export function EpisodeCard({ episode, index, total, onSelect }: EpisodeCardProps) {
  return (
    <article className="brut-card flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b-4 border-ink bg-accent px-4 py-2 font-mono text-sm font-bold uppercase">
        <span>
          Stop {index + 1} of {total}
        </span>
        <span className="text-right">{episode.place}</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5" aria-live="polite">
        <h3 className="font-display text-2xl uppercase leading-tight sm:text-3xl">{episode.title}</h3>
        <p className="text-base leading-relaxed sm:text-lg">{episode.summary}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2" aria-label="Characters">
          {episode.characters.map((character) => (
            <li
              key={character}
              className="border-2 border-ink bg-paper px-2 py-0.5 font-mono text-xs font-bold"
            >
              {character}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t-4 border-ink bg-paper p-4 pr-5 pb-5">
        <button
          type="button"
          className="brut-btn px-3 py-2 uppercase"
          disabled={index === 0}
          onClick={() => onSelect(index - 1)}
        >
          ← Prev
        </button>
        <button
          type="button"
          className="brut-btn px-3 py-2 uppercase"
          disabled={index === total - 1}
          onClick={() => onSelect(index + 1)}
        >
          Next →
        </button>
      </div>
    </article>
  );
}
