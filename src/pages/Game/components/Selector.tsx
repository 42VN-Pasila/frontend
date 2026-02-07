import React, { SVGProps } from 'react'
import SpadeIcon from "../../../assets/game/symbols-svg/Spade-icon.svg?react";
import HeartIcon from "../../../assets/game/symbols-svg/Heart-icon.svg?react";
import DiamondIcon from "../../../assets/game/symbols-svg/Diamond-icon.svgreact";
import ClubIcon from "../../../assets/game/symbols-svg/Club-icon.svg?react";

export interface SelectorItem<T extends string | number = string> {
  value: T;
  label?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface SelectorProps<T extends string | number = string> {
  items: SelectorItem<T>[];

  value: T | null;
  onChange: (value: T) => void;

  disabled?: boolean;

  columns?: number;   // grid layout control
  className?: string;
}

const suits: SelectorItem<CardSuit>[] = [
  { value: "spades", label: "Spades", Icon: SpadeIcon },
  { value: "hearts", label: "Hearts", Icon: HeartIcon },
  { value: "diamonds", label: "Diamonds", Icon: DiamondIcon },
  { value: "clubs", label: "Clubs", Icon: ClubIcon },
];

