import type { Lens, Suit } from "@/types/tarot";
import { suitLabel } from "@/types/tarot";

export function Legend({ suits, lens }: { suits: Suit[]; lens: Lens }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {suits.map((suit) => {
        const { name, icon } = suitLabel(suit, lens);
        return (
          <div
            key={suit.id}
            className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs text-neutral-600"
            title={suit.description}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </div>
        );
      })}
    </div>
  );
}
