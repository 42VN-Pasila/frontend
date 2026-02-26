import { getPlayerByPos } from "../../Logic/roomLogic";
import type { Player, SeatPos } from "../../Type/types";
import OpenSeat from "./OpenSeat";
import SeatPlayer from "./SeatPlayer";

const POS_CLASS: Record<SeatPos, string> = {
  top: "left-1/2 top-2/5 -translate-x-1/2 -translate-y-[260px]",
  bottom: "left-1/2 top-2/5 -translate-x-1/2 translate-y-[270px]",
  left: "left-1/2 top-1/2 -translate-y-1/2 -translate-x-[600px]",
  right: "left-1/2 top-1/2 -translate-y-1/2 translate-x-[520px]",
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

  return (
    <div className={`absolute w-fit h-fit ${POS_CLASS[pos]}`}>
      {!player ? (
        <OpenSeat label="OPEN SEAT" onClick={onJoinNext} />
      ) : (
        <SeatPlayer player={player} pos={pos} onLeave={onLeave} />
      )}
    </div>
  );
}
