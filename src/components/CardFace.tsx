import type { Card } from "@/types/tarot";

export function CardFace({ card }: { card: Card }) {
  return (
    <div className="flex h-40 w-28 flex-col items-center justify-between rounded-xl border border-neutral-300 bg-[#faf7f2] px-3 py-4 text-center shadow-md select-none">
      <span className="text-3xl leading-none">{card.icon}</span>
      <span className="text-xs font-medium leading-tight text-neutral-800">
        {card.title}
      </span>
    </div>
  );
}
