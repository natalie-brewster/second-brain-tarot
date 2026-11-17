"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Card } from "@/types/tarot";
import { CardFace } from "./CardFace";
import { seededRandom } from "@/lib/seeded-random";

interface Placement {
  card: Card;
  xPct: number;
  yPct: number;
  rotate: number;
}

function computePlacements(cards: Card[]): Placement[] {
  const cols = Math.ceil(Math.sqrt(cards.length));
  const rows = Math.ceil(cards.length / cols);
  return cards.map((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const jitterX = (seededRandom(card.id + "x") - 0.5) * (80 / cols);
    const jitterY = (seededRandom(card.id + "y") - 0.5) * (80 / rows);
    const rotate = (seededRandom(card.id + "r") - 0.5) * 24;
    return {
      card,
      xPct: ((col + 0.5) / cols) * 100 + jitterX,
      yPct: ((row + 0.5) / rows) * 100 + jitterY,
      rotate,
    };
  });
}

export function DeckSpread({
  cards,
  onSelect,
}: {
  cards: Card[];
  onSelect: (card: Card) => void;
}) {
  const placements = useMemo(() => computePlacements(cards), [cards]);

  return (
    <div className="relative h-[75vh] w-full">
      {placements.map(({ card, xPct, yPct, rotate }, i) => (
        <motion.div
          key={card.id}
          className="absolute cursor-pointer"
          style={{ left: `${xPct}%`, top: `${yPct}%` }}
          initial={{ opacity: 0, scale: 0.6, rotate: 0, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, rotate, x: "-50%", y: "-50%" }}
          transition={{
            delay: i * 0.03,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.18, rotate: 0, zIndex: 50 }}
          onClick={() => onSelect(card)}
        >
          <CardFace card={card} />
        </motion.div>
      ))}
    </div>
  );
}
