import type { Card, Lens, Suit } from "@/types/tarot";
import { suitLabel } from "@/types/tarot";

export function CardFace({
  card,
  suit,
  lens,
}: {
  card: Card;
  suit: Suit;
  lens: Lens;
}) {
  const { icon: suitIcon, name: suitName } = suitLabel(suit, lens);

  return (
    <div
      className="relative flex h-40 w-28 flex-col items-center justify-between rounded-xl border border-neutral-300 px-3 py-4 text-center shadow-md select-none"
      style={{ backgroundColor: card.color }}
    >
      <span
        className="absolute left-2 top-2 text-xs opacity-70"
        title={suitName}
      >
        {suitIcon}
      </span>
      <span className="text-3xl leading-none">{card.icon}</span>
      <span className="text-xs font-medium leading-tight text-neutral-800">
        {card.title}
      </span>
    </div>
  );
}
