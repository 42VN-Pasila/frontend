import { Tag } from "@/shared/components/Tag";

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
    <Tag
      className={className}
      variant={isDanger ? "primary" : "inverse"}
      emphasis="low"
      {...props}
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

      <span className="text-2xl pt-1 font-mono leading-none transition-colors duration-300">
        00:{String(timeLeft).padStart(2, "0")}
      </span>
    </Tag >
  );
};

export default Timer;