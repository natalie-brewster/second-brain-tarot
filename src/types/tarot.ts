export type Lens = "tarot" | "brain";

export interface Suit {
  id: string;
  tarotName: string;
  tarotIcon: string;
  brainName: string;
  brainIcon: string;
  description: string;
}

export interface Card {
  id: string;
  suitId: string;
  title: string;
  icon: string;
  color: string;
  fragment: string;
  sourcePath?: string;
}

export interface Deck {
  suits: Suit[];
  cards: Card[];
}

export function suitLabel(suit: Suit, lens: Lens): { name: string; icon: string } {
  return lens === "tarot"
    ? { name: suit.tarotName, icon: suit.tarotIcon }
    : { name: suit.brainName, icon: suit.brainIcon };
}
