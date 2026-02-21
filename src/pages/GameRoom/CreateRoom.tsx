import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components";
import { RoomId } from "@/shared/api/roomId";



export default function CreateRoom() {
  const navigate = useNavigate();
  async function handleCreateRoom() {
    const roomId = await RoomId();
    navigate(`/rooms/${roomId}`);
  }

  return (
    <div className="min-h-screen w-full grid place-items-center px-4 py-10">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <Button onClick={handleCreateRoom}>
          Create Room
        </Button>
        <div className="text-xs text-white/50">(Mock) navigate to /room/1122</div>
      </div>
    </div>
  );
}
