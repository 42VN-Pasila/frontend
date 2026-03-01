import type { Opponent } from "../../common/types/players";
import OpponentProfile from "./OpponentProfile";

interface OpponentDisplayProps {
  positions: { left: Opponent; top: Opponent; right: Opponent };
  selectedId: number | null;
  onSelect: (id: number) => void;
  isInteractive: boolean;
}

const OpponentDisplay = ({ positions, selectedId, onSelect, isInteractive }: OpponentDisplayProps) => {
  const layout = [
    { data: positions.top, side: "top" as const, gridClass: "col-start-2" },
    { data: positions.left, side: "left" as const, gridClass: "col-start-1 row-start-2" },
    { data: positions.right, side: "right" as const, gridClass: "col-start-3 row-start-2" },
  ];

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-x-[10vw] w-full gap-y-10 place-items-center p-10">
      {layout.map(({ data, side, gridClass }) => (
        <div key={data.id} className={gridClass}>
          <OpponentProfile
            {...data}
            side={side}
            selected={selectedId === data.id}
            onClick={() => isInteractive && onSelect(data.id)}
          />
        </div>
      ))}
    </div>
  );
};
export default OpponentDisplay;