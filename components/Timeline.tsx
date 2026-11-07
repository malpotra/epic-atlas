"use client";

import { useEffect, useRef } from "react";
import type { Epic } from "@/content/types";

interface TimelineProps {
  epic: Epic;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function Timeline({ epic, activeIndex, onSelect }: TimelineProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLLIElement>(null);

  // Scrolls only the strip. scrollIntoView could also move the page.
  useEffect(() => {
    const container = scroller.current;
    const item = activeItem.current;
    if (!container || !item) return;
    container.scrollTo({
      left: item.offsetLeft - (container.clientWidth - item.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [activeIndex, epic.id]);

  return (
    <div ref={scroller} className="timeline-scroll relative overflow-x-auto pt-1 pb-4">
      <ol className="relative flex w-max gap-3 pr-3 pb-2">
        {epic.episodes.map((episode, index) => {
          const active = index === activeIndex;
          return (
            <li key={episode.id} ref={active ? activeItem : undefined} className="w-44 shrink-0 sm:w-52">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(index)}
                className={`brut-btn h-full w-full flex-col items-start justify-start p-3 text-left ${
                  active ? "bg-accent" : index < activeIndex ? "bg-paper" : ""
                }`}
              >
                <span className="font-display text-2xl leading-none">{index + 1}</span>
                <span className="font-sans text-sm leading-tight font-bold">{episode.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
