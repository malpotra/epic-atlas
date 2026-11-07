import { epics } from "@/content";
import type { EpicId } from "@/content/types";

const BACKGROUND: Record<EpicId, string> = {
  odyssey: "bg-odyssey",
  iliad: "bg-iliad",
  ramayana: "bg-ramayana",
  mahabharata: "bg-mahabharata",
};

interface EpicSwitcherProps {
  activeId: EpicId;
  onSelect: (id: EpicId) => void;
}

export function EpicSwitcher({ activeId, onSelect }: EpicSwitcherProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" role="group" aria-label="Choose an epic">
      {epics.map((epic) => (
        <button
          key={epic.id}
          type="button"
          aria-pressed={epic.id === activeId}
          onClick={() => onSelect(epic.id)}
          className={`brut-btn min-h-20 px-2 py-3 font-display text-base font-normal uppercase sm:text-xl ${BACKGROUND[epic.id]}`}
        >
          {epic.title.replace(/^The /, "")}
        </button>
      ))}
    </div>
  );
}
