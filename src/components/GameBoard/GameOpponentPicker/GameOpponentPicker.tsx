import { useMemo } from "react";

import type { SeatDto } from "@/gen/director";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import type { Opponent } from "../types";

import OpponentDisplay from "./OpponentDisplay";

function getOrderedOpponents(
  opponents: Opponent[],
  seats: SeatDto[],
  username: string,
): Opponent[] {
  if (!username) {
    return [];
  }

  const orderedSeats = [...seats].sort((a, b) => a.order - b.order);
  const playerIndex = orderedSeats.findIndex(
    (seat) => seat.username === username,
  );
  if (playerIndex === -1) {
    return opponents.filter((opponent) => opponent.id !== username);
  }

  const seatOrder = [
    ...orderedSeats.slice(playerIndex + 1),
    ...orderedSeats.slice(0, playerIndex),
  ]
    .map((seat) => seat.username)
    .filter((id) => id !== username);

  const orderedOpponents = seatOrder
    .map((id) => opponents.find((opponent) => opponent.id === id))
    .filter((opponent): opponent is Opponent => Boolean(opponent));

  const remainingOpponents = opponents.filter(
    (opponent) =>
      opponent.id !== username &&
      !orderedOpponents.some((ordered) => ordered.id === opponent.id),
  );

  return [...orderedOpponents, ...remainingOpponents];
}

interface GameOpponentPickerProps extends React.ComponentPropsWithoutRef<"section"> {
  selectedOpponentUsername: string | null;
  onSelectOpponent: (id: string) => void;
  disabled: boolean;
}

const GameOpponentPicker = ({
  selectedOpponentUsername,
  onSelectOpponent,
  disabled,
  className,
  ...props
}: GameOpponentPickerProps) => {
  const currentUsername = useUserStore().username.trim();
  const opponents = useGameSessionStore().opponents;
  const seats = useGameSessionStore().seats;

  const orderedOpponents = useMemo(
    () => getOrderedOpponents(opponents, seats, currentUsername),
    [opponents, seats, currentUsername],
  );
  const activeSeat = useMemo(() => seats.find((seat) => seat.isTurn), [seats]);
  const activeTurnOpponentId = useMemo(() => {
    const activeUsername = activeSeat?.username;
    if (!activeUsername || activeUsername === currentUsername) {
      return null;
    }
    return activeUsername;
  }, [activeSeat?.username, currentUsername]);

  return (
    <section
      {...props}
      className={`${className} flex flex-col bg-rave-black   relative h-full overflow-hidden`}
    >
      {orderedOpponents.length > 0 && (
        <OpponentDisplay
          opponents={orderedOpponents}
          selectedId={selectedOpponentUsername}
          onSelect={(id: string) => onSelectOpponent(id)}
          disabled={disabled}
          activeTurnOpponentId={activeTurnOpponentId}
        />
      )}
    </section>
  );
};

export default GameOpponentPicker;
