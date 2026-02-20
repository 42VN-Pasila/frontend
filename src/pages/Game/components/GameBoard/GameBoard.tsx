import { useParams, Navigate, useLocation } from "react-router-dom";
import GameControlCenter from "./GameControlCenter";
import GameOpponents from "./GameOpponents";
import GamePlayerCard from "./GamePlayerCard";

export type CardRequestPayload = {
  suit: CardSuit;
  rank: CardRank;
  opponentId: number;
};

const GameBoard = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const location = useLocation();
    const state = location.state as { localPlayerId: number; activeId: number } | null;

    if (!state) {
      return <Navigate to="/game/mock" replace />;
    }

    const { localPlayerId, activeId } = state;

    const handleCardRequest = (payload: CardRequestPayload) => {
    console.log(`Player ${localPlayerId} requesting from ${payload.opponentId} in room ${roomId}`);
  };

    return (
      <div className="grid grid-cols-3 h-screen w-screen overflow-hidden bg-slate-950">
        <GameControlCenter
          roomId={roomId!}
          activeId={activeId}
        />
        <main className="col-span-2 grid grid-rows-3 h-full">
          <GameOpponents
            className="row-span-2" 
            localPlayerId={localPlayerId}
            activeId={activeId}
          />
          <GamePlayerCard
            className="row-span-1" 
            playerId={localPlayerId}
            isMyTurn={localPlayerId === activeId}
          />
        </main>
      </div>
    );
  };

export default GameBoard;