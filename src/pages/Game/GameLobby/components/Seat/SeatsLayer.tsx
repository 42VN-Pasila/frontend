import type { Player } from "../../Type/types";
import SeatSlot from "./SeatSlot";
export default function SeatsLayer({
  players,
  onJoinNext,
  onLeave,
}: {
  players: Player[];
  onJoinNext: () => void;
  onLeave: (userId: number) => void;
}) {
  return (
    <div className="absolute inset-0">
      <SeatSlot
        pos="top"
        players={players}
        onJoinNext={onJoinNext}
        onLeave={onLeave}
      />
      <SeatSlot
        pos="left"
        players={players}
        onJoinNext={onJoinNext}
        onLeave={onLeave}
      />
      <SeatSlot
        pos="right"
        players={players}
        onJoinNext={onJoinNext}
        onLeave={onLeave}
      />
      <SeatSlot
        pos="bottom"
        players={players}
        onJoinNext={onJoinNext}
        onLeave={onLeave}
      />
    </div>
  );
}
