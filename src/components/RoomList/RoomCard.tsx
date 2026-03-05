import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export type RoomLike = {
    id: string;
    code: string;
    players: number;
    maxPlayers?: number;
    status?: "OPEN" | "FULL";
};

type RoomCardProps = {
    room: RoomLike;
    onJoin?: (id: string) => void;
};

export const StatusTag = ({ room }: { room: RoomLike }) => {
    const max = room.maxPlayers ?? 4;
    const full = room.players >= max;
    const status = room.status ?? (full ? "FULL" : "OPEN");
    const isOpen = status === "OPEN";

    return (
        <div
            className="inline-flex items-center rounded-none px-3 py-1 text-xs font-black tracking-[0.20em]"
            style={{
                background: isOpen ? "#DD0339" : "rgba(228,227,227,0.12)",
                color: isOpen ? "#120F10" : "#E4E3E3",
                border: `1px solid ${isOpen ? "rgba(221,3,57,0.00)" : "rgba(228,227,227,0.14)"}`,
            }}
            aria-label={`status-${status}`}
        >
            {status}
        </div>
    );
};

export const RoomCard = ({ room, onJoin }: RoomCardProps) => {
    const max = room.maxPlayers ?? 4;
    const full = room.players >= max;
    const disabled = full;

    return (
        <div
            className="grid grid-cols-1 gap-3 border p-5 md:grid-cols-[1.2fr_0.6fr_0.6fr_auto] md:items-center"
            style={{ borderColor: "rgba(228,227,227,0.14)", background: "rgba(0,0,0,0.25)" }}
        >
            <div className="min-w-0">
                <div className="text-[11px] font-black tracking-[0.22em]" style={{ color: "rgba(228,227,227,0.65)" }}>
                    ROOM
                </div>
                <div className="mt-1 truncate text-2xl font-black tracking-tight" style={{ color: "#E4E3E3" }}>
                    {room.code}
                </div>
                <div className="mt-1 text-xs" style={{ color: "rgba(228,227,227,0.55)" }}>
                    {room.id}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="text-sm font-black" style={{ color: "#E4E3E3" }}>
                    <PersonOutlineIcon fontSize="small" /> {room.players}/{max}
                </div>
            </div>

            <div className="flex md:justify-center">
                <StatusTag room={room} />
            </div>

            <div className="flex md:justify-end">
                <button
                    type="button"
                    onClick={() => onJoin?.(room.id)}
                    disabled={disabled}
                    className="rounded-none border px-6 py-2 font-black tracking-[0.14em]"
                    style={{
                        background: disabled ? "rgba(228,227,227,0.10)" : "#DD0339",
                        color: disabled ? "#E4E3E3" : "#120F10",
                        borderColor: disabled ? "rgba(228,227,227,0.14)" : "rgba(221,3,57,0.00)",
                    }}
                >
                    JOIN
                </button>
            </div>
        </div>
    );
};

export default RoomCard;