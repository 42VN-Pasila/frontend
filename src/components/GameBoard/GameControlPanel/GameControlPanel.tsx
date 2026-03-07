import { GameLiveChat } from "../GameLiveChat/GameLiveChat";
import { ButtonController } from "./ButtonController";
import { Timer } from "./Timer";
import { CollectedBooks } from "./CollectedBooks";

export const GameControlPanel = () => {
    return (
        <aside className="w-72 lg:w-80 shrink-0 h-full border-l-2 border-rave-white/10 bg-rave-black flex flex-col overflow-hidden">
            <ButtonController />
            <Timer />
            <CollectedBooks />
            <GameLiveChat />
        </aside>
    );
};