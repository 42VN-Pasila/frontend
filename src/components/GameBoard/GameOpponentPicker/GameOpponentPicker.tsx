import OpponentDisplay from "./OpponentDisplay";
import type { Opponent } from "../types";
import { useMemo } from "react";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";
import type { SeatDto } from "@/gen/director";

type Positions = {
  left: Opponent;
  top: Opponent;
  right: Opponent;
};

function getPositions(opponents: Opponent[], seats: SeatDto[], userId: string): Positions | null {
  if (!userId || opponents.length < 3 || seats.length < 4) {
    return null;
  }

  const orderedSeats = [...seats].sort((a, b) => a.order - b.order);
  const playerIndex = orderedSeats.findIndex((seat) => seat.userId === userId);
  if (playerIndex === -1) {
    return null;
  }

  const positionOrder = [
    ...orderedSeats.slice(playerIndex + 1),
    ...orderedSeats.slice(0, playerIndex),
  ]
    .map((seat) => seat.userId)
    .filter((id) => id !== userId);

  if (positionOrder.length < 3) {
    return null;
  }

  const fallbackOpponents = opponents.filter((opponent) => opponent.id !== userId);

  return {
    left: opponents.find((o) => o.id === positionOrder[0]) ?? fallbackOpponents[0],
    top: opponents.find((o) => o.id === positionOrder[1]) ?? fallbackOpponents[1],
    right: opponents.find((o) => o.id === positionOrder[2]) ?? fallbackOpponents[2],
  };
}

interface GameOpponentPickerProps extends React.ComponentPropsWithoutRef<"section"> {
  selectedOpponentId: string | null;
  onSelectOpponent: (id: string) => void;
  disabled: boolean;
}

const GameOpponentPicker = ({
  selectedOpponentId,
  onSelectOpponent,
  disabled,
  className,
  ...props
}: GameOpponentPickerProps) => {

  const userId = useUserStore().userId;
  const opponents = useGameSessionStore().opponents;
  const seats = useGameSessionStore().seats;

  const sortedPositions = useMemo(() =>
    getPositions(opponents, seats, userId),
    [opponents, seats, userId]
  );
  const activeSeat = useMemo(
    () => seats.find((seat) => seat.isTurn),
    [seats],
  );
  const activeTurnOpponentId = useMemo(() => {
    const activeUserId = activeSeat?.userId;
    if (!activeUserId || activeUserId === userId) {
      return null;
    }
    return activeUserId;
  }, [activeSeat?.userId, userId]);

  return (
    <section
      {...props}
      className={`${className} flex flex-col bg-rave-black   relative h-full overflow-hidden`}>
      {sortedPositions && (
        <OpponentDisplay
          positions={sortedPositions}
          selectedId={selectedOpponentId}
          onSelect={(id: string) => onSelectOpponent(id)}
          disabled={disabled}
          activeTurnOpponentId={activeTurnOpponentId}
        />
      )}
    </section>
  );
};

export default GameOpponentPicker;
