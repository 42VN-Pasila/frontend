import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { directorApi } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import {
  useGameSessionStore,
  useUserStore,
} from "@/shared/stores/useGameSessionStore";

import { Tag } from "../../shared/components/Tag";
import { handleConnectRoomError } from "./errorConnectHandling";

export type RoomLike = {
  id: string;
  code: string;
  players: number;
  maxPlayers?: number;
  status?: "OPEN" | "FULL";
  onConnectError: (err: string) => void 
};

type RoomCardProps = {
  room: RoomLike;
};

export const RoomCard = ({ room }: RoomCardProps) => {
  const max = room.maxPlayers ?? 4;
  const full = room.players >= max;
  const status = room.status ?? (full ? "FULL" : "OPEN");

  const { userId } = useUserStore();
  const { roomId, setRoomId, setPlayerId } = useGameSessionStore();
  const [connectRoom] = directorApi.useConnectRoomMutation();

  const disabled = full || !!roomId;

  const handleConnectRoom = async (roomId: string) => {
    if (!userId || !roomId) return;
    try {
      await connectRoom({ roomId, userId }).unwrap();
      console.log("Connected to room", roomId);
      setRoomId(roomId);
      setPlayerId(userId);
    } catch (error: unknown) {
      const errorMessage = handleConnectRoomError(error);
      room.onConnectError(errorMessage);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 border p-5 md:grid-cols-[1.2fr_0.6fr_0.6fr_auto] md:items-center border-rave-white/10 bg-rave-white/5">
      <div className="min-w-0">
        <div
          className="text-[11px] font-black tracking-[0.22em]"
          style={{ color: "rgba(228,227,227,0.65)" }}
        >
          ROOM
        </div>
        <div
          className="mt-1 truncate text-2xl font-black tracking-tight"
          style={{ color: "#E4E3E3" }}
        >
          {room.code}
        </div>
        <div
          className="mt-1 text-xs"
          style={{ color: "rgba(228,227,227,0.55)" }}
        >
          {room.id}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm font-black" style={{ color: "#E4E3E3" }}>
          <PersonOutlineIcon fontSize="small" /> {room.players}/{max}
        </div>
      </div>

      <div className="flex md:justify-center">
        <Tag
          variant={status === "OPEN" ? "primary" : "inverse"}
          emphasis={"low"}
        >
          {status}
        </Tag>
      </div>

      <Button
        type="button"
        onClick={() => handleConnectRoom(room.id)}
        disabled={disabled}
        className="rounded-none border font-black tracking-[0.14em] "
        size="medium"
      >
        {disabled ? "LOCKED" : "JOIN"}
      </Button>
    </div>
  );
};

export default RoomCard;
