import CardSvg, { CardEmptySlot } from "./CardSvg";
import type { Card } from "../../common/types/cards";
import type { NullableProps } from "@/common/types";

export default function CardPreview({ suit, rank }: NullableProps<Card>) {
  return (
    <div className="px-8 flex justify-center">
      <div className="w-full min-w-[160px]">
        {suit && rank ? (
          <CardSvg 
            card={{ suit, rank }} 
            className="shadow-2xl scale-105"
          />
        ) : (
          <CardEmptySlot>Your selected Card</CardEmptySlot>
        )}
      </div>
    </div>
  );
}