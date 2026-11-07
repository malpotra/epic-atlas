"use client";

import { useState } from "react";
import { EpicSwitcher } from "@/components/EpicSwitcher";
import { EpisodeCard } from "@/components/EpisodeCard";
import { JourneyMap } from "@/components/JourneyMap";
import { Timeline } from "@/components/Timeline";
import { epics } from "@/content";
import type { EpicId } from "@/content/types";

export function Atlas() {
  const [epicId, setEpicId] = useState<EpicId>(epics[0].id);
  const [activeIndex, setActiveIndex] = useState(0);

  const epic = epics.find(({ id }) => id === epicId) ?? epics[0];

  const selectEpic = (id: EpicId) => {
    setEpicId(id);
    setActiveIndex(0);
  };

  return (
    <section
      id="atlas"
      data-epic={epic.id}
      aria-labelledby="atlas-title"
      className="mx-auto max-w-7xl scroll-mt-20 space-y-8 px-4 py-12 sm:px-6"
    >
      <h2 id="atlas-title" className="font-display text-4xl uppercase sm:text-5xl">
        The Atlas
      </h2>

      <EpicSwitcher activeId={epic.id} onSelect={selectEpic} />

      <header>
        <h3 className="font-display text-3xl uppercase sm:text-4xl">{epic.title}</h3>
        <p className="mt-1 text-lg sm:text-xl">{epic.tagline}</p>
        <p className="mt-1 font-mono text-sm font-bold">{epic.origin}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <figure className="min-w-0">
          <div className="brut-card overflow-hidden">
            {/* Remounts per epic so the route draws in afresh. */}
            <JourneyMap key={epic.id} epic={epic} activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>
          <figcaption className="mt-3 text-sm">{epic.mapCaption}</figcaption>
        </figure>

        <EpisodeCard
          episode={epic.episodes[activeIndex]}
          index={activeIndex}
          total={epic.episodes.length}
          onSelect={setActiveIndex}
        />
      </div>

      <div>
        <h3 className="mb-3 font-mono text-sm font-bold uppercase">Timeline</h3>
        <Timeline epic={epic} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
    </section>
  );
}
