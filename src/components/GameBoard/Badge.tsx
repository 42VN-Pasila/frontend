
interface BadgeProps extends React.ComponentPropsWithoutRef<"div"> {
  count: number;
  imageUrl: string;
}

const Badge = ({
  count,
  imageUrl,
  className = "",
  ...props
}: BadgeProps) => {



  return (
    <div
      {...props}
      className={`group select-none shrink-0 transition-all duration-200 group-hover:-translate-y-1 ${className}`}
    >
      <div className={`relative w-10 h-12`}>
        <img
          src={imageUrl}
          className="w-full h-full object-contain drop-shadow-md"
        />
        <span className="absolute inset-0 m-auto flex h-6 w-6 items-center justify-center rounded-full border font-black text-white text-center bg-slate-900/40 backdrop-blur-sm shadow-2xl border-white/20 text-small">
          {count}
        </span>
      </div>


    </div>
  );
};

export default Badge;