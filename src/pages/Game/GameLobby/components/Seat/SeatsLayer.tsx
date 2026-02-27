import type { Player } from "../../Type/types";
import SeatSlot from "./SeatSlot";
export default function SeatsLayer({
  players,
  onLeave,
}: {
  players: Player[];
  onLeave: (userId: number) => void;
}) {
  return (
    <div className="absolute inset-0">
      <SeatSlot
        pos="top"
        players={players}
        onLeave={onLeave}
      />
      <SeatSlot
        pos="left"
        players={players}
        onLeave={onLeave}
      />
      <SeatSlot
        pos="right"
        players={players}
        onLeave={onLeave}
      />
      <SeatSlot
        pos="bottom"
        players={players}
        onLeave={onLeave}
      />
    </div>
  );
}
