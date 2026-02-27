import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { addPlayer, listRooms } from "./Logic/roomStore";
import { getOrCreateCurrentUser, resetCurrentUser } from "./Mock/mockIdentity";

export default function RoomList() {
  const nav = useNavigate();
  const me = useMemo(() => getOrCreateCurrentUser(), []);
  const [rooms, setRooms] = useState(() => listRooms());

  function refresh() {
    setRooms(listRooms());
  }

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "mock_rooms_v1") {
        refresh();
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Room List</div>
          <div className="text-sm text-white/60">You: {me.username}</div>
        </div>

        <div className="flex gap-2">
          <button
            className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition"
            onClick={() => {
              resetCurrentUser();
              location.reload();
            }}
          >
            New Identity
          </button>
          <button
            className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition"
            onClick={refresh}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {rooms.map((r) => {
          const isFull = r.players.length >= 4;

          return (
            <div
              key={r.id}
              className="rounded-xl bg-black/40 border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition"
            >
              <div>
                <div className="font-semibold">Room #{r.id}</div>
                <div className="text-sm text-white/60">
                  Players: {r.players.length}/4
                </div>
              </div>

              {isFull ? (
                <div className="flex items-center gap-2 text-red-400 font-bold tracking-widest">
                  <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                  FULL
                </div>
              ) : (
                <button
                  className="px-4 py-2 rounded bg-[var(--color-primary)] hover:scale-105 transition font-semibold"
                  onClick={() => {
                    addPlayer(r.id, me);
                    nav(`/rooms/${r.id}`);
                  }}
                >
                  Join
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
