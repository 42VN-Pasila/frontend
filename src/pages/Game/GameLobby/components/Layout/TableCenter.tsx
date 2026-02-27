import { Button } from "@/shared/components";

export default function TableCenter({
  isOwner,
  canStart,
  onStart,
}: {
  isOwner: boolean;
  canStart: boolean;
  onStart: () => void;
}) {
  let label = "Join";
  let disabled = false;
  let onClick;

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

      {!isOwner ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex gap-1 text-#E2E4F6 text-3xl font-extrabold tracking-widest">
            {"Waiting for player...".split("").map((char, index) => (
              <span
                key={index}
                className="waiting-letter"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <Button
            className="bg-[var(--color-primary)] z-1000"
            onClick={onClick}
            disabled={disabled}
          >
            {label}
          </Button>
        </div>
      )}
    </div>
  );
}
