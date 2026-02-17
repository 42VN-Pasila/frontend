import { useNavigate } from 'react-router-dom';
import { Button } from "@/shared/components";

const MockRoomTest = () => {
    const navigate = useNavigate();
    const MOCK_ROOM_ID = "room888";

    const handleStartGame = () => {
        console.log(`Staring game room: ${MOCK_ROOM_ID}`);
        navigate(`/dev/game/${MOCK_ROOM_ID}`);
    }

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Mock Room Test</h1>
      <div className="p-6 bg-slate-800 rounded-lg shadow-xl border border-slate-700">
        <p className="mb-4 text-slate-400">Room ID: <span className="text-blue-400 font-mono">{MOCK_ROOM_ID}</span></p>
        <Button
          onClick={handleStartGame}
          variant="primary"
          size="large"
          color="purple"
        >
          START GAME
        </Button>
      </div>
    </div>
  );
};

export default MockRoomTest;

