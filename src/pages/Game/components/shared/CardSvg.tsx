import { CARD_IMAGES } from "../../common/assets/cards";
import type { Card } from "../../common/types/cards";

export const CardEmptySlot = ({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"div">) => (
  <div
    {...props}
    className={`
      aspect-[2/3] border-2 border-dashed border-(--color-primary) 
      bg-slate-700/40 rounded-xl flex items-center justify-center 
      text-slate-400 text-sm text-center p-4 ${className}
    `}
  >
    {children}
  </div>
);

interface CardSvgProps extends React.ComponentPropsWithoutRef<"div"> {
  card: Card;
  aspectRatio?: string;
}

const CardSvg = ({ card, className = "", ...props }: CardSvgProps) => {
  const SelectedCard = CARD_IMAGES[card.suit][card.rank];

  return (
    <div
      {...props}
      className={`aspect-[2/3] drop-shadow-md transition-all duration-200 ${className}`}
    >
      <SelectedCard className="w-full h-full rounded-xl object-contain" />
    </div>
  );
};

export default CardSvg;