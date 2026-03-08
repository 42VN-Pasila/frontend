import type { Opponent } from "../types";
import OpponentProfile from "./OpponentProfile";

interface OpponentDisplayProps {
  positions: { left: Opponent; top: Opponent; right: Opponent };
  selectedId: string | null;
  onSelect: (id: string) => void;
  disabled: boolean;
}

const OpponentDisplay = ({ positions, selectedId, onSelect, disabled }: OpponentDisplayProps) => {
  const layout = [
    { data: positions.top, side: "top" as const },
    { data: positions.left, side: "left" as const },
    { data: positions.right, side: "right" as const },
  ];

  return (
    <div className="flex grow gap-x-[4vw] w-full items-center justify-center p-10">
      {layout.map(({ data }) => (
        <div key={data.id}>
          <OpponentProfile
            {...data}
            selected={selectedId === data.id}
            onClick={() => !disabled && onSelect(data.id)}
          />
        </div>
      ))}
    </div>
  );
};
export default OpponentDisplay;