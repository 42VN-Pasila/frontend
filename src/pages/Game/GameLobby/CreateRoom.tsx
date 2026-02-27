import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { RoomId } from "@/shared/api/roomApi";
import { Button } from "@/shared/components";
import { getOrCreateCurrentUser } from "./Mock/mockIdentity";
import { createRoomWithId } from "./Logic/roomStore";

export default function CreateRoom() {
  const navigate = useNavigate();
  const me = useMemo(() => getOrCreateCurrentUser(), []);

  async function handleCreateRoom() {
    const roomId = await RoomId();          
    createRoomWithId(String(roomId), me);   
    navigate(`/rooms/${roomId}`);
  }

  return (
    <div className="min-h-screen w-full grid place-items-center px-4 py-10">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <Button onClick={handleCreateRoom}>Create Room</Button>
        <div className="text-xs text-white/50">(Mock)</div>
      </div>
    </div>
  );
}