interface TimerProps extends React.ComponentPropsWithoutRef<"div"> {
  timeLeft: number;
  dangerThreshold?: number;
  icon?: string;
}

const Timer = ({
  timeLeft,
  dangerThreshold = 7,
  icon,
  className,
  ...props
}: TimerProps) => {
  const isDanger = timeLeft <= dangerThreshold;

  return (
    <div
      {...props}
      className={`flex items-center justify-between bg-slate-800 rounded-md px-4 py-3 gap-2 ${
          isDanger ? "animate-bounce" : ""
        } ${className ?? ""}`}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <img 
            src={icon} 
            alt="Timer Icon" 
            className="w-10 h-10 object-contain" 
          />
        )}
      </div>

      <div
        className={`text-2xl pt-1 font-mono leading-none transition-colors duration-300 ${
          isDanger ? "text-red-500 animate-pulse" : "text-white"
        }`}
      >
        00:{String(timeLeft).padStart(2, "0")}
      </div>
    </div>
  );
};

export default Timer;