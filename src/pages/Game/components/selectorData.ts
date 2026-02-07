import React from "react";
import SpadeIcon from "../../../assets/game/symbols-svg/Spade-icon.svg?react";
import HeartIcon from "../../../assets/game/symbols-svg/Heart-icon.svg?react";
import DiamondIcon from "../../../assets/game/symbols-svg/Diamond-icon.svg?react";
import ClubIcon from "../../../assets/game/symbols-svg/Club-icon.svg?react";

export interface SelectorItem<T extends string | number = string> {
  value: T;
  label?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type CardSuit = "spades" | "hearts" | "diamonds" | "clubs";

export const suits: SelectorItem<CardSuit>[] = [
  { value: "spades", label: "Spades", Icon: SpadeIcon },
  { value: "hearts", label: "Hearts", Icon: HeartIcon },
  { value: "diamonds", label: "Diamonds", Icon: DiamondIcon },
  { value: "clubs", label: "Clubs", Icon: ClubIcon },
];


