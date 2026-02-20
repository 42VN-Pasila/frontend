import { useState } from "react";
import { Button } from "@/shared/components";
import { GameBoard } from "../Game/components/GameBoard/GameBoard";

function pickRandomOpponentId(localId: number) {
  const pool = [1, 2, 3, 4].filter((id) => id !== localId);
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

const MockRoomTest = () => {
  const [LOCAL_PLAYER_ID] = useState(() => Math.floor(Math.random() * 4) + 1);
  const [activeId, setActiveId] = useState<number | null>(null);

  const isGameStarted = activeId !== null;

  return (
    <div className="h-screen w-screen bg-slate-900 text-white">
      {!isGameStarted ? (
        /* --- SETUP / MENU UI --- */
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold mb-8">Mock Room Test</h1>
          <div className="p-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700 space-x-4">
            <Button
              onClick={() => setActiveId(LOCAL_PLAYER_ID)}
              variant="primary"
              size="large"
              color="purple"
            >
              START GAME (Your Turn)
            </Button>
            <Button
              onClick={() => setActiveId(pickRandomOpponentId(LOCAL_PLAYER_ID))}
              variant="inverse"
              size="large"
            >
              START GAME (Opponent's Turn)
            </Button>
          </div>
        </div>
      ) : (
        /* --- GAME BOARD UI --- */
        <GameBoard
          activePlayerId={activeId}
          localPlayerId={LOCAL_PLAYER_ID}
          onSelect={(payload) => {
            console.log("Mock choice received, send to backend:", payload);
            setActiveId(null); // This resets to the menu after a choice
          }}
        />
      )}
    </div>
  );
};

export default MockRoomTest;