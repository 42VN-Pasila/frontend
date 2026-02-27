import CardBackImg from "@assets/card-back-2.png";

interface CardBadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  count: number;
}

const CardBadge = ({ count, className = "", ...props }: CardBadgeProps) => (
  <div 
    {...props} 
    className={`relative w-16 h-20 shrink-0 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105 ${className}`}
  >
    <img src={CardBackImg} alt="Card Count" className="w-full h-full object-contain" />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xl flex items-center justify-center border-2 w-9 h-9 rounded-full font-black text-white bg-slate-900/50 backdrop-blur-sm shadow-xl">
        {count}
      </span>
    </div>
  </div>
);

export default CardBadge;