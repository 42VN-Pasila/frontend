import type { Player } from "../types";

export default function BottomPanel({
  player,
  className,
  onLeave,
}: {
  player: Player;
  className?: string;
  onLeave: (userId: number) => void;
}) {
  return (
    <div
      className={[
        "absolute flex flex-col justify-center items-center gap-2 z-1000",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-center justify-center rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80">
        <div className="w-full h-full">
          {player.user.username}
        </div>
      </div>
      <div className="relative">
        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-[var(--color-primary)] shadow-xl">
          <img
            src={player.user.avatarUrl}
            alt={player.user.username}
            className="h-fit w-fit m-auto object-cover"
          />
        </div>

        {player.isOwner ? (
          <div className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-sky-400 shadow-lg grid place-items-center text-xs">
            🏠
          </div>
        ) : null}
        {onLeave ? (
          <button
            type="button"
            onClick={() => onLeave(player.user.id)}
            className="absolute -left-2 -top-2 h-7 w-7 rounded-full bg-black/50 border border-white/15 shadow-lg grid place-items-center text-[10px] text-white hover:bg-black/70"
            title="Leave"
          >
            ⎋
          </button>
        ) : null}
      </div>
    </div>
  );
}
