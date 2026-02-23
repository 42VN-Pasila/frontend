import React from "react";

import { getPlayerByPos } from "../roomLogic";
import type { Player, SeatPos } from "../types";

import BottomPanel from "./BottomPanel";
import OpenSeat from "./OpenSeat";
import PlayerSeat from "./PlayerSeat";

function getPosClassName(pos: SeatPos) {
  if (pos === "top") return "left-1/2 -top-6 -translate-x-1/2";
  if (pos === "left") return "-left-6 top-1/2 -translate-y-1/2";
  if (pos === "right") return "-right-6 top-1/2 -translate-y-1/2";
  if (pos === "bottom") return"left-1/2 top-4/5 -translate-x-1/2";
  return "";
}

export default function SeatSlot({
  pos,
  players,
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
    if (player)
      return (
        <BottomPanel onLeave={onLeave} player={player} className={className} />
      );
    return (
      <OpenSeat label="OPEN SEAT" className={className} />
    );
  }

  if (player)
    return (
      <PlayerSeat player={player} className={className} onLeave={onLeave} />
    );

  return (
    <OpenSeat label="OPEN SEAT" className={className} />
  );
}
