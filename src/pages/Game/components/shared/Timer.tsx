interface TimerProps extends React.ComponentPropsWithoutRef<"div"> {
  timeLeft: number;
  dangerThreshold?: number;
  icon?: string;
}

const Timer = ({
  timeLeft,
  dangerThreshold = 5,
  icon,
  className,
  ...props
}: TimerProps) => {
  const isDanger = timeLeft <= dangerThreshold;

  return (
    <div
      {...props}
      className={`flex items-center justify-between bg-slate-800 rounded-md px-4 py-3 ${className ?? ""}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <img 
            src={icon} 
            alt="Timer Icon" 
            className="w-12 h-12 md:w-16 md:h-16 object-contain" 
          />
        )}
      </div>

      <div
        className={`text-4xl font-mono leading-none transition-colors duration-300 ${
          isDanger ? "text-red-500 animate-pulse" : "text-white"
        }`}
      >
        00:{String(timeLeft).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Timer;