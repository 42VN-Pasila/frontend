import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { useConnectRoomMutation } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";

import { Tag } from "../../shared/components/Tag";
import { useRoomStore } from "@/shared/stores/useRoomStore";
import { MAX_PLAYERS } from "@/common/constants";

type Room = {
    id: string;
    name: string;
    userCount: number;
    status?: "OPEN" | "FULL";
    onConnectError: (err: string) => void
};

type RoomCardProps = {
    room: Room;
};

export const RoomCard = ({ room }: RoomCardProps) => {
    const full = room.userCount === MAX_PLAYERS;
    const status = room.status ?? (full ? "FULL" : "OPEN");

    const { id: roomId, setRoomId, setUsers, setOwnerId, setConnectionCount } = useRoomStore();
    const { userId, setUserId } = useUserStore();

    const { mutateAsync: connectRoom } = useConnectRoomMutation();


    const disabled = full || !!roomId;

    const handleConnectRoom = async (roomId: string) => {
        if (!userId || !roomId) return;
        const data = await connectRoom({ roomId });
        setRoomId(roomId);
        setUserId(userId);
        setUsers(data.room.users);
        setOwnerId(data.room.ownerId);
        setConnectionCount(data.room.connectionCount);
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
                    {room.name}
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
                    <PersonOutlineIcon fontSize="small" /> {room.userCount}/{MAX_PLAYERS}
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
