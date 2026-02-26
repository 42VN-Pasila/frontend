import { Button } from "@/shared/components";
export default function TableCenter({
  isOwner,
  canStart,
  onStart,
  onJoin,
}: {
  isOwner: boolean;
  canStart: boolean;
  onStart: () => void;
  onJoin: () => void;
}) {
  let label = "Join";
  let disabled = false;
  let onClick = onJoin;

  if (isOwner) {
    label = "Start";
    disabled = !canStart;
    onClick = onStart;
  }

  return (
    <div
      className={[
        "w-full h-full",
        "rounded-[999px]",
        "bg-[#8E3B46]",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        "border border-black/20",
        "relative",
      ].join(" ")}
    >
      <div className="absolute inset-0 rounded-[999px]">
        <div className="absolute inset-6 rounded-[999px] border-[10px] border-transparent ring-2 ring-[#E0777D]" />
        <div className="absolute inset-10 rounded-[999px] border border-[#E0777D] opacity-50" />
      </div>

      <div className="absolute inset-0 grid place-items-center">
         <Button
          className="bg-[var(--color-primary)] z-1000"
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
