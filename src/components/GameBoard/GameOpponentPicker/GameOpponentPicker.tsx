import OpponentDisplay from "./OpponentDisplay";
import type { Opponent } from "../types";
import { useMemo } from "react";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";
import type { SeatDto } from "@/gen/director";

function getOrderedOpponents(opponents: Opponent[], seats: SeatDto[], userId: string): Opponent[] {
  if (!userId) {
    return [];
  }

  const orderedSeats = [...seats].sort((a, b) => a.order - b.order);
  const playerIndex = orderedSeats.findIndex((seat) => seat.userId === userId);
  if (playerIndex === -1) {
    return opponents.filter((opponent) => opponent.id !== userId);
  }

  const seatOrder = [
    ...orderedSeats.slice(playerIndex + 1),
    ...orderedSeats.slice(0, playerIndex),
  ]
    .map((seat) => seat.userId)
    .filter((id) => id !== userId);

  const orderedOpponents = seatOrder
    .map((id) => opponents.find((opponent) => opponent.id === id))
    .filter((opponent): opponent is Opponent => Boolean(opponent));

  const remainingOpponents = opponents.filter(
    (opponent) => opponent.id !== userId && !orderedOpponents.some((ordered) => ordered.id === opponent.id),
  );

  return [...orderedOpponents, ...remainingOpponents];
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

  const orderedOpponents = useMemo(() =>
    getOrderedOpponents(opponents, seats, userId),
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
      {orderedOpponents.length > 0 && (
        <OpponentDisplay
          opponents={orderedOpponents}
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
