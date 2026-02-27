import type { NullableProps } from "@/common/types";

import { CARD_IMAGES } from "../../common/assets/cards";
import type { Card } from "../../common/types/cards";

type CardPreviewProps = NullableProps<Card>;

export default function CardPreview({ suit, rank }: CardPreviewProps) {
  const containerStyles = "w-full min-w-[180px] max-w-[240px] aspect-[5/7] rounded-2xl transition-all duration-300";
  if (!suit || !rank) {
    return (
      <div className="px-8 flex justify-center">
        <div
          className={`
            ${containerStyles}
            border-2 border-dashed
            border-(--color-primary)
            bg-slate-700/40
            flex items-center justify-center
            text-slate-400 text-sm md:text-base text-center p-4
          `}
        >
          Your selected Card
        </div>
      </div>
    );
  }

  const Card = CARD_IMAGES[suit][rank];

  return (
    <div className="px-8 flex justify-center">
        <Card className={`${containerStyles} w-full h-full rounded-xl shadow-xl object-contain`} />
    </div>
  );
}


