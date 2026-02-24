import { getPlayerByPos } from "../../Logic/roomLogic";
import type { Player, SeatPos } from "../../Type/types";
import BottomPanel from "../Layout/BottomPanel";
import OpenSeat from "./OpenSeat";
import PlayerSeat from "./PlayerSeat";

const POS_CLASS: Record<SeatPos, string> = {
  top: "left-1/2 -top-6 -translate-x-1/2",
  left: "-left-6 top-1/2 -translate-y-1/2",
  right: "-right-6 top-1/2 -translate-y-1/2",
  bottom: "left-1/2 top-4/5 -translate-x-1/2",
};

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
  const className = POS_CLASS[pos];

  if (!player) {
    return (
      <OpenSeat label="OPEN SEAT" className={className} onClick={onJoinNext} />
    );
  }

  if (pos === "bottom") {
    return (
      <BottomPanel onLeave={onLeave} player={player} className={className} />
    );
  }

  return <PlayerSeat player={player} className={className} onLeave={onLeave} />;
}