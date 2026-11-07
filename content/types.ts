export type EpicId = "odyssey" | "iliad" | "ramayana" | "mahabharata";

export interface Episode {
  id: string;
  title: string;
  place: string;
  /** Map position in the shared 1000 x 700 viewBox. */
  x: number;
  y: number;
  summary: string;
  characters: string[];
}

export interface Epic {
  id: EpicId;
  title: string;
  /** Traditional attribution and language. */
  origin: string;
  tagline: string;
  mapCaption: string;
  episodes: Episode[];
}

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 700;
