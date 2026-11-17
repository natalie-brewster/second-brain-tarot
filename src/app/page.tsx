"use client";

import { useState } from "react";
import { DeckSpread } from "@/components/DeckSpread";
import { Legend } from "@/components/Legend";
import { LensToggle } from "@/components/LensToggle";
import { getDeck } from "@/lib/deck";
import { cardLabel, suitLabel } from "@/types/tarot";
import type { Card, Lens } from "@/types/tarot";

export default function Home() {
  const deck = getDeck();
  const [lens, setLens] = useState<Lens>("tarot");
  const [selected, setSelected] = useState<Card | null>(null);
  const [question, setQuestion] = useState("");
  const [reading, setReading] = useState<string | null>(null);
  const [readingStatus, setReadingStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");

  const suitsById = new Map(deck.suits.map((suit) => [suit.id, suit]));

  async function handleSelect(card: Card) {
    setSelected(card);
    setReading(null);
    setReadingStatus("loading");

    const suit = suitsById.get(card.suitId);
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          cardTitle: cardLabel(card, lens),
          suitName: suit ? suitLabel(suit, lens).name : "",
          fragment: card.fragment,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setReading(data.reading);
      setReadingStatus("idle");
    } catch {
      setReadingStatus("error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f4f1ec] px-6 py-10 font-sans">
      <h1 className="text-xl font-medium tracking-wide text-neutral-800">
        second-brain-tarot
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Sift through the deck. Pick whatever's calling to you.
      </p>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What's on your mind? (optional)"
        className="mt-5 w-full max-w-sm rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 outline-none focus:border-neutral-500"
      />

      <div className="mt-6">
        <LensToggle lens={lens} onChange={setLens} />
      </div>

      <div className="mt-4">
        <Legend suits={deck.suits} lens={lens} />
      </div>

      <DeckSpread
        cards={deck.cards}
        suits={deck.suits}
        lens={lens}
        onSelect={handleSelect}
      />

      {selected && (
        <div className="mt-4 max-w-md rounded-xl border border-neutral-300 bg-white px-6 py-4 text-center shadow-sm">
          <div className="text-2xl">{selected.icon}</div>
          <div className="mt-1 font-medium text-neutral-800">
            {cardLabel(selected, lens)}
          </div>
          <div className="mt-2 text-sm text-neutral-600">
            {selected.fragment}
          </div>
          <div className="mt-3 border-t border-neutral-200 pt-3 text-sm italic text-neutral-700">
            {readingStatus === "loading" && "Reading..."}
            {readingStatus === "error" &&
              "Couldn't generate a reading — try again."}
            {readingStatus === "idle" && reading}
          </div>
        </div>
      )}
    </div>
  );
}
