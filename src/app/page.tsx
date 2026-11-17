"use client";

import { useState } from "react";
import { DeckSpread } from "@/components/DeckSpread";
import { getDeck } from "@/lib/deck";
import type { Card } from "@/types/tarot";

export default function Home() {
  const deck = getDeck();
  const [selected, setSelected] = useState<Card | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f4f1ec] px-6 py-10 font-sans">
      <h1 className="text-xl font-medium tracking-wide text-neutral-800">
        second-brain-tarot
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Sift through the deck. Pick whatever's calling to you.
      </p>

      <DeckSpread cards={deck.cards} onSelect={setSelected} />

      {selected && (
        <div className="mt-4 max-w-md rounded-xl border border-neutral-300 bg-white px-6 py-4 text-center shadow-sm">
          <div className="text-2xl">{selected.icon}</div>
          <div className="mt-1 font-medium text-neutral-800">
            {selected.title}
          </div>
          <div className="mt-2 text-sm text-neutral-600">
            {selected.fragment}
          </div>
        </div>
      )}
    </div>
  );
}
