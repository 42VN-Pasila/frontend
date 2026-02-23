import type { NullableProps } from "@/common/types";

import { CARD_IMAGES } from "../../common/assets/cards";
import type { Card } from "../../common/types/cards";

type CardPreviewProps = NullableProps<Card>;

export default function CardPreview({ suit, rank }: CardPreviewProps) {
  if (!suit || !rank) {
    return (
      <div className="px-8">
        <div
          className="
            w-64 h-88
            rounded-2xl
            border-2 border-dashed
            border-(--color-primary)
            bg-slate-700/40
            flex items-center justify-center
            text-slate-400 text-xl text-center
          "
        >
          Your selected Card will show here
        </div>
      </div>
    );
  }

  const Card = CARD_IMAGES[suit][rank];

  return (
    <div className="px-8">
      <Card className="w-64 h-88 rounded-xl shadow" />
    </div>
  );
}
