import { GameLiveChat } from "../GameLiveChat/GameLiveChat";
import { ButtonController } from "./ButtonController";
import { Timer } from "./Timer";

export const GameControlPanel = () => {
    return (
        <div className="h-full border border-rave-white/15 flex flex-col">
            <ButtonController />
            <Timer />
            <GameLiveChat />
        </div>
    );
};