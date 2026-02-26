import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateCurrentUser, resetCurrentUser } from "./Mock/mockIdentity";
import { addPlayer, listRooms  } from "./Logic/roomStore";

export default function RoomList() {
  const nav = useNavigate();
  const me = useMemo(() => getOrCreateCurrentUser(), []);
  const [rooms, setRooms] = useState(() => listRooms());

  function refresh() {
    setRooms(listRooms());
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Room List</div>
          <div className="text-sm text-white/60">You: {me.username}</div>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded bg-white/10"
            onClick={() => {
              resetCurrentUser();
              location.reload();
            }}
          >
            New Identity
          </button>
          <button className="px-3 py-2 rounded bg-white/10" onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {rooms.map((r) => (
          <div key={r.id} className="rounded-xl bg-black/40 border border-white/10 p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">Room #{r.id}</div>
              <div className="text-sm text-white/60">
                Players: {r.players.length}/4 • {r.status}
              </div>
            </div>

            <button
              className="px-4 py-2 rounded bg-[var(--color-primary)]"
              onClick={() => {
                addPlayer(r.id, me);
                nav(`/rooms/${r.id}`);
              }}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}