type TurnIndicatorProps = {
  label?: string;
  className?: string;
};

const TurnIndicator = ({
  label = "TURN",
  className = "",
}: TurnIndicatorProps) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 rounded-full border border-rave-red bg-rave-red/15 px-3 py-1.5 shadow-[0_10px_26px_-18px_rgba(0,0,0,0.7)] backdrop-blur-sm">
        <span className="inline-flex h-2 w-2 rounded-full bg-rave-red animate-pulse" />
        <span className="text-[10px] font-black tracking-[0.2em] text-rave-white">
          {label}
        </span>
      </div>
    </div>
  );
};

export default TurnIndicator;
