import { GameLiveChat } from "../GameLiveChat/GameLiveChat";

import { ButtonController } from "./ButtonController";
import { CollectedBooks } from "./CollectedBooks";
import { Timer } from "./Timer";

type GameControlPanelProps = {
  onExitGame: () => void;
  isExiting: boolean;
  resetTurn: boolean;
};

export const GameControlPanel = ({
  onExitGame,
  isExiting,
  resetTurn,
}: GameControlPanelProps) => {
  return (
    <aside className="w-72 lg:w-80 shrink-0 h-full border-l-2 border-rave-white/10 bg-rave-black flex flex-col overflow-hidden">
      <ButtonController onExitGame={onExitGame} isExiting={isExiting} />
      <Timer isDisabled={isExiting} resetTurn={resetTurn} />
      <CollectedBooks />
      <GameLiveChat />
    </aside>
  );
};
