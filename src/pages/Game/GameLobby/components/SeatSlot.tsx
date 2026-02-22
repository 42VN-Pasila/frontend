import React from "react";
import type { Player, SeatPos } from "../types";
import { getPlayerByPos } from "../roomLogic";

import OpenSeat from "./OpenSeat";
import PlayerSeat from "./PlayerSeat";
import BottomPanel from "./BottomPanel";

function getPosClassName(pos: SeatPos) {
  if (pos === "top") return "left-1/2 -top-6 -translate-x-1/2";
  if (pos === "left") return "-left-6 top-1/2 -translate-y-1/2";
  if (pos === "right") return "-right-6 top-1/2 -translate-y-1/2";
  return "left-8 -bottom-8";
}

export default function SeatSlot({
  pos,
  players,
  onJoinNext,
  onLeave,
}: {
  pos: SeatPos;
  players: Player[];
  onJoinNext: () => void;
  onLeave: (userId: number) => void;
}) {
  const player = getPlayerByPos(players, pos);
  const className = getPosClassName(pos);

  if (pos === "bottom") {
    if (player) return <BottomPanel player={player} className={className} />;
    return null;
  }

  if (player) return <PlayerSeat player={player} className={className} onLeave={onLeave} />;

  return <OpenSeat label="OPEN SEAT" className={className} onClick={onJoinNext} />;
}
