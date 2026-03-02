type BadgeVariant = "card" | "deck" | "circle";

interface BadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  variant: BadgeVariant;
  count: number;
  imageUrl: string;
  label?: string;
}

const Badge = ({ 
  variant, 
  count, 
  imageUrl, 
  label, 
  className = "", 
  ...props 
}: BadgeProps) => {
  
  const sizeClasses = {
    card: "w-16 h-22",
    deck: "w-full h-full pl-2 pt-1",
    circle: "w-20 h-20 pl-1 rounded-full"
  };

  return (
    <div
      {...props}
      className={`group relative flex flex-col items-center shrink-0 transition-all duration-200 group-hover:-translate-y-1 ${className}`}
    >
      <div className={`relative ${sizeClasses[variant]}`}>
        <img 
          src={imageUrl} 
          alt={label || "badge"} 
          className="w-full h-full object-contain drop-shadow-md" 
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center border-1 min-w-[2rem] h-9 px-2 rounded-full font-black text-white text-center bg-slate-900/40 backdrop-blur-sm shadow-2xl border-white/20 text-lg">
            {count}
          </span>
        </div>
      </div>

      {label && (
        <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/70 group-hover:text-white/80 transition-colors">
          {label}
        </span>
      )}
    </div>
  );
};

export default Badge;