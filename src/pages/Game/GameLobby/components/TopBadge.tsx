import React from "react";

export default function TopBadge({
  roomId,
  playerCount,
}: {
  roomId: string;
  playerCount: number;
}) {
  return (
    <div className="absolute left-6 top-6 rounded-2xl bg-black/35 px-4 py-3 text-white shadow-lg backdrop-blur border border-white/10">
      <div className="text-xs font-extrabold tracking-widest">ROOM #{roomId}</div>
      <div className="mt-1 text-[11px] text-white/70">Players: {playerCount}/4</div>
    </div>
  );
}
