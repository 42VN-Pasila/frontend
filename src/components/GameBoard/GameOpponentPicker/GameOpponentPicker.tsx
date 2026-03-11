import OpponentDisplay from "./OpponentDisplay";
import type { Opponent } from "../types";
import { useMemo } from "react";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

type Positions = {
  left: Opponent;
  top: Opponent;
  right: Opponent;
};

function getPositions(opponents: Opponent[], turnOrder: string[], userId: string): Positions | null {
  if (!userId || opponents.length < 3 || turnOrder.length < 4) {
    return null;
  }

  const playerIndex = turnOrder.findIndex((id) => id === userId);
  if (playerIndex === -1) {
    return null;
  }

  const positionOrder = [
    ...turnOrder.slice(playerIndex + 1),
    ...turnOrder.slice(0, playerIndex),
  ];

  return {
    left: opponents.find((o) => o.id === positionOrder[0]) ?? opponents[0],
    top: opponents.find((o) => o.id === positionOrder[1]) ?? opponents[1],
    right: opponents.find((o) => o.id === positionOrder[2]) ?? opponents[2],
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
  const turnOrder = useGameSessionStore().turnOrder;

  const sortedPositions = useMemo(() =>
    getPositions(opponents, turnOrder, userId),
    [opponents, turnOrder, userId]
  );

  console.log(sortedPositions)

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
        />
      )}
    </section>
  );
};

export default GameOpponentPicker;
