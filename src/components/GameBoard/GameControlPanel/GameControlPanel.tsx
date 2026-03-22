import { GameLiveChat } from "../GameLiveChat/GameLiveChat";
import { ButtonController } from "./ButtonController";
import { Timer } from "./Timer";
import { CollectedBooks } from "./CollectedBooks";

type GameControlPanelProps = {
    onExitGame: () => void;
    isExiting: boolean;
};

export const GameControlPanel = ({ onExitGame, isExiting }: GameControlPanelProps) => {
    return (
        <aside className="w-72 lg:w-80 shrink-0 h-full border-l-2 border-rave-white/10 bg-rave-black flex flex-col overflow-hidden">
            <ButtonController onExitGame={onExitGame} isExiting={isExiting} />
            <Timer isDisabled={isExiting} />
            <CollectedBooks />
            <GameLiveChat />
        </aside>
    );
};