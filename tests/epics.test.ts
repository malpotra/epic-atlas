import { describe, expect, it } from "vitest";
import { epics } from "../content";
import { MAP_HEIGHT, MAP_WIDTH } from "../content/types";

describe("epic content", () => {
  it("has unique epic ids", () => {
    const ids = epics.map((epic) => epic.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(epics)("$title", (epic) => {
    it("has unique episode ids", () => {
      const ids = epic.episodes.map((episode) => episode.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("keeps every stop on the map", () => {
      for (const { x, y } of epic.episodes) {
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(MAP_WIDTH);
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(MAP_HEIGHT);
      }
    });

    it("keeps stops far enough apart to click separately", () => {
      const { episodes } = epic;
      for (let i = 0; i < episodes.length; i++) {
        for (let j = i + 1; j < episodes.length; j++) {
          const distance = Math.hypot(episodes[i].x - episodes[j].x, episodes[i].y - episodes[j].y);
          expect(distance, `${episodes[i].id} / ${episodes[j].id}`).toBeGreaterThanOrEqual(40);
        }
      }
    });

    it("gives every episode a summary and characters", () => {
      for (const episode of epic.episodes) {
        expect(episode.summary.length).toBeGreaterThan(0);
        expect(episode.characters.length).toBeGreaterThan(0);
      }
    });
  });
});
