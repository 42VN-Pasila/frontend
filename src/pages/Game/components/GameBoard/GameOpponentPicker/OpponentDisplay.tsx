import type { Opponent } from "../../../common/types/players";
import OpponentProfile from "../GameOpponentPicker/OpponentProfile";

interface OpponentDisplayProps {
  positions: { left: Opponent; top: Opponent; right: Opponent };
  selectedId: number | null;
  onSelect: (id: number) => void;
  isInteractive: boolean;
}

const OpponentDisplay = ({ positions, selectedId, onSelect, isInteractive }: OpponentDisplayProps) => {
  const layout = [
    { data: positions.top, side: "top" as const },
    { data: positions.left, side: "left" as const },
    { data: positions.right, side: "right" as const },
  ];

  return (
    <div className="flex flex-grow gap-x-[8vw] w-full items-center justify-center p-10">
      {layout.map(({ data }) => (
        <div key={data.id}>
          <OpponentProfile
            {...data}
            selected={selectedId === data.id}
            onClick={() => isInteractive && onSelect(data.id)}
          />
        </div>
      ))}
    </div>
  );
};
export default OpponentDisplay;