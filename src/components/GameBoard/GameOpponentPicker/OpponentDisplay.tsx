import type { Opponent } from "../types";
import OpponentProfile from "./OpponentProfile";

interface OpponentDisplayProps {
  opponents: Opponent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
  activeTurnOpponentId: string | null;
}

const OpponentDisplay = ({
  opponents,
  selectedId,
  onSelect,
  disabled,
  activeTurnOpponentId,
}: OpponentDisplayProps) => {
  const visibleOpponents = opponents.slice(0, 3);
  const count = visibleOpponents.length;

  const getContainerClassName = () => {
    if (count === 1) {
      return "flex grow w-full items-center justify-center p-10";
    }

    if (count === 2) {
      return "grid grow w-full grid-cols-2 gap-x-[4vw] items-center justify-center p-10";
    }

    return "grid grow w-full grid-cols-2 gap-x-[4vw] gap-y-8 items-center justify-center p-10";
  };

  const getItemClassName = (index: number) => {
    if (count === 3 && index === 0) {
      return "col-span-2 flex justify-center";
    }

    return "flex justify-center";
  };

  return (
    <div className={getContainerClassName()}>
      {visibleOpponents.map((opponent, index) => (
        <div key={opponent.id} className={getItemClassName(index)}>
          <OpponentProfile
            {...opponent}
            selected={selectedId === opponent.id}
            onClick={() => !disabled && onSelect(opponent.id)}
            isActiveTurn={activeTurnOpponentId === opponent.id}
          />
        </div>
      ))}
    </div>
  );
};
export default OpponentDisplay;