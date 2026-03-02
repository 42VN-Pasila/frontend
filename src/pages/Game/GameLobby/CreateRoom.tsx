import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components";

export default function CreateRoom() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full grid place-items-center px-4 py-10">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <Button onClick={() => navigate(`/GameLobby`)}>Create Room</Button>
        <div className="text-xs text-white/50">(Mock)</div>
      </div>
    </div>
  );
}
