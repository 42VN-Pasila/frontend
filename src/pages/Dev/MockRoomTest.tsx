import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/shared/components";

function pickRandomOpponentId(localId: number) {
  const pool = [1, 2, 3, 4].filter((id) => id !== localId);
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

const MockRoomTest = () => {
  const [LOCAL_PLAYER_ID] = useState(() => Math.floor(Math.random() * 4) + 1);
  // const [activeId, setActiveId] = useState<number | null>(null);
  const navigate = useNavigate();
  const MOCK_ROOM_ID = "room888";

  const handleStartGame = (startingId: number) => {
    console.log(`Staring game room: ${MOCK_ROOM_ID}`);
    navigate(`/dev/game/${MOCK_ROOM_ID}`), { 
      state: { activeId: startingId, localPlayerId: LOCAL_PLAYER_ID }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Mock Room Test</h1>
      <div className="p-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
        <p className="mb-4 text-slate-400">Room ID: <span className="text-blue-400 font-mono">{MOCK_ROOM_ID}</span></p>
        <Button
          onClick={() => handleStartGame(LOCAL_PLAYER_ID)}
          variant="primary"
          size="large"
          color="purple"
        >
          START GAME (Your Turn)
        </Button>
        <Button
          onClick={() => handleStartGame(pickRandomOpponentId(LOCAL_PLAYER_ID))}
          variant="inverse"
          size="large"
        >
          START GAME (Opponent's Turn)
        </Button>
      </div>
    </div>
  );
};

export default MockRoomTest;