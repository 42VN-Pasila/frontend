import React from "react";
import type { Player } from "../types";

export default function BottomPanel({
  player,
  className,
}: {
  player: Player;
  className?: string;
}) {
  return (
    <div className={["absolute flex items-end gap-4", className ?? ""].join(" ")}>
      <div className="relative">
        <img
          src={player.user.avatarUrl}
          alt={player.user.username}
          className="h-20 w-20 rounded-full object-cover bg-white/10 border-4 border-yellow-400/70 shadow-xl"
        />
        {player.isOwner ? (
          <div className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-sky-400 shadow-lg grid place-items-center text-xs">
            🏠
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl bg-black/35 px-4 py-2 shadow-lg backdrop-blur border border-white/10">
        <div className="text-sm font-extrabold text-white">{player.user.username}</div>
        <div className="mt-0.5 text-[11px] text-white/70">
          Player #{player.seat}
          {player.isOwner ? " • Owner" : ""}
        </div>
      </div>
    </div>
  );
}
