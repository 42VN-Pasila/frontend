import type { Player, SeatPos } from "../../Type/types";

export default function SeatPlayer({
  player,
  pos,
  onLeave,
}: {
  player: Player;
  pos: SeatPos;
  onLeave: (userId: number) => void;
}) {
  const isTop = pos !== "bottom";
  const stackClass = isTop ? "flex-col-reverse" : "flex-col";

  return (
    <div className={`flex ${stackClass} items-center gap-2`}>
      <div className="max-w-[140px] truncate rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80">
        {player.user.username}
      </div>
      <div className="relative">
        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-[var(--color-primary)] shadow-xl">
          <img
            src={player.user.avatarUrl}
            alt={player.user.username}
            className="h-full w-full object-cover"
          />
        </div>
        {player.isOwner ? (
          <div className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-sky-400 text-xs shadow-lg">
            🏠
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => onLeave(player.user.id)}
          className="absolute -left-2 -top-2 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-black/50 text-[10px] text-white shadow-lg hover:bg-black/70"
          title="Leave"
        >
          ⎋
        </button>
      </div>
    </div>
  );
}
