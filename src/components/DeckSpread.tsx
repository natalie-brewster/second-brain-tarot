"use client";

import { motion } from "framer-motion";
import type { Card } from "@/types/tarot";
import { CardFace } from "./CardFace";
import { seededRandom } from "@/lib/seeded-random";

const CARD_WIDTH = 112;
const STACK_ORIGIN_X = 24;
const SPACING = 56;
const FAN_ROTATE_STEP = 5;

export function DeckSpread({
  cards,
  onSelect,
}: {
  cards: Card[];
  onSelect: (card: Card) => void;
}) {
  const center = (cards.length - 1) / 2;
  const containerWidth = STACK_ORIGIN_X + (cards.length - 1) * SPACING + CARD_WIDTH;

  return (
    <div className="w-full overflow-x-auto px-6">
      <div
        className="relative mx-auto h-56"
        style={{ width: `${containerWidth}px` }}
      >
        {cards.map((card, i) => {
          const stackJitter = (seededRandom(card.id + "stack") - 0.5) * 8;
          const fanRotate = (i - center) * FAN_ROTATE_STEP;

          return (
            <motion.div
              key={card.id}
              className="absolute cursor-pointer"
              style={{ left: STACK_ORIGIN_X, top: "50%" }}
              initial={{ x: 0, y: "-50%", rotate: stackJitter }}
              animate={{ x: i * SPACING, y: "-50%", rotate: fanRotate }}
              transition={{
                delay: i * 0.06,
                type: "spring",
                stiffness: 220,
                damping: 22,
              }}
              whileHover={{
                scale: 1.18,
                rotate: 0,
                y: "-65%",
                zIndex: 50,
              }}
              onClick={() => onSelect(card)}
            >
              <CardFace card={card} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
