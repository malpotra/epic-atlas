"use client";

import { useState } from "react";
import { MapBackdrop } from "@/components/art/MapBackdrop";
import { MAP_HEIGHT, MAP_WIDTH, type Epic } from "@/content/types";

const LABEL_CHAR_WIDTH = 13;
const LABEL_HEIGHT = 36;
const STOP_SIZE = 38;
const HIT_SIZE = 56;

/** Share of the whole route covered on arriving at each stop, from 0 to 100. */
function routeProgress(epic: Epic): number[] {
  const legs = epic.episodes.slice(1).map((stop, i) => {
    const previous = epic.episodes[i];
    return Math.hypot(stop.x - previous.x, stop.y - previous.y);
  });
  const total = legs.reduce((sum, leg) => sum + leg, 0);
  let covered = 0;
  return [0, ...legs.map((leg) => ((covered += leg) / total) * 100)];
}

function StopLabel({ x, y, text }: { x: number; y: number; text: string }) {
  const width = text.length * LABEL_CHAR_WIDTH + 20;
  const left = Math.min(Math.max(x - width / 2, 6), MAP_WIDTH - width - 6);
  const top = y - STOP_SIZE / 2 - LABEL_HEIGHT - 8 < 4 ? y + STOP_SIZE / 2 + 8 : y - STOP_SIZE / 2 - LABEL_HEIGHT - 8;
  return (
    <g pointerEvents="none">
      <rect x={left} y={top} width={width} height={LABEL_HEIGHT} fill="var(--ink)" />
      <text
        x={left + width / 2}
        y={top + LABEL_HEIGHT / 2 + 7}
        textAnchor="middle"
        fontFamily="var(--font-label), monospace"
        fontWeight="700"
        fontSize="21"
        fill="var(--white)"
      >
        {text}
      </text>
    </g>
  );
}

interface JourneyMapProps {
  epic: Epic;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function JourneyMap({ epic, activeIndex, onSelect }: JourneyMapProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const points = epic.episodes.map(({ x, y }) => `${x},${y}`).join(" ");
  const travelled = routeProgress(epic)[activeIndex];
  const labelled = epic.episodes[hovered ?? activeIndex];

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="block h-auto w-full"
      role="group"
      aria-label={`Map of ${epic.title} with ${epic.episodes.length} stops`}
    >
      <MapBackdrop epic={epic.id} />

      <polyline
        points={points}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeDasharray="4 12"
        strokeLinecap="round"
      />
      <polyline
        className="route-travelled"
        points={points}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="8"
        strokeLinejoin="round"
        pathLength={100}
        style={{ strokeDasharray: `${travelled} 100` }}
      />

      {epic.episodes.map((episode, index) => {
        const active = index === activeIndex;
        const visited = index < activeIndex;
        return (
          <g
            key={episode.id}
            className="map-stop"
            role="button"
            tabIndex={0}
            aria-label={`Stop ${index + 1}: ${episode.title}, ${episode.place}`}
            aria-current={active ? "step" : undefined}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(index);
              }
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(null)}
          >
            <rect
              x={episode.x - HIT_SIZE / 2}
              y={episode.y - HIT_SIZE / 2}
              width={HIT_SIZE}
              height={HIT_SIZE}
              fill="transparent"
            />
            <rect
              className="stop-focus"
              x={episode.x - HIT_SIZE / 2 + 2}
              y={episode.y - HIT_SIZE / 2 + 2}
              width={HIT_SIZE - 4}
              height={HIT_SIZE - 4}
              fill="none"
              stroke="transparent"
              strokeWidth="4"
            />
            <g className="stop-box">
              <rect
                x={episode.x - STOP_SIZE / 2 + 5}
                y={episode.y - STOP_SIZE / 2 + 5}
                width={STOP_SIZE}
                height={STOP_SIZE}
                fill="var(--ink)"
              />
              <rect
                x={episode.x - STOP_SIZE / 2}
                y={episode.y - STOP_SIZE / 2}
                width={STOP_SIZE}
                height={STOP_SIZE}
                fill={active ? "var(--ink)" : visited ? "var(--accent)" : "var(--white)"}
                stroke="var(--ink)"
                strokeWidth="4"
              />
              <text
                x={episode.x}
                y={episode.y + 8}
                textAnchor="middle"
                fontFamily="var(--font-label), monospace"
                fontWeight="700"
                fontSize="22"
                fill={active ? "var(--white)" : "var(--ink)"}
              >
                {index + 1}
              </text>
            </g>
          </g>
        );
      })}

      <StopLabel x={labelled.x} y={labelled.y} text={labelled.place} />
    </svg>
  );
}
