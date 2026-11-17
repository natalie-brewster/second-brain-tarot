import sampleDeck from "@/data/sample-deck.json";
import type { Deck } from "@/types/tarot";

export function getDeck(): Deck {
  return sampleDeck as Deck;
}
