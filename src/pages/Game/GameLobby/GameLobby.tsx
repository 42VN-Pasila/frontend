import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import LobbyBackGround from "../common/assets/LobbyBackGround.jpg";

import type { Player, User } from "./types";
import { MOCK_USERS } from "./mockUsers";
import { joinNext, leaveAndMigrateOwner, resetToOwner } from "./roomLogic";

import TopBadge from "./components/TopBadge";
import TopRightIcons from "./components/TopRightIcons";
import TableCenter from "./components/TableCenter";
import SeatsLayer from "./components/SeatsLayer";

export default function GameLobby() {
  const params = useParams();
  const roomId = params.roomId ?? "????";

  const ownerUser = useMemo<User>(() => MOCK_USERS[3], []);
  const joinQueue = useMemo<User[]>(() => MOCK_USERS.filter((u) => u.id !== ownerUser.id), [ownerUser.id]);

  const myUserId = ownerUser.id;

  const [players, setPlayers] = useState<Player[]>(() => resetToOwner(ownerUser));

  function handleJoinNext() {
    setPlayers((prev) => joinNext(prev, joinQueue));
  }

  function handleLeave(userId: number) {
    setPlayers((prev) => leaveAndMigrateOwner(prev, userId));
  }

  function handleReset() {
    setPlayers(resetToOwner(ownerUser));
  }

  const ownerNow = players.find((p) => p.isOwner);
  const canStart = ownerNow ? ownerNow.user.id === myUserId : false;

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Background image */}
      <img
        src={LobbyBackGround}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_20%,transparent_40%,rgba(0,0,0,0.70)_100%)]" />

      <TopBadge roomId={roomId} playerCount={players.length} />
      <TopRightIcons onReset={handleReset} />

      {/* Debug controls */}
      {/* <div className="absolute left-6 top-28 flex gap-3">
        <button
          type="button"
          onClick={handleJoinNext}
          className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm text-white"
        >
          Mock Join Next
        </button>

        <button
          type="button"
          onClick={() => {
            const owner = players.find((p) => p.isOwner);
            if (owner) handleLeave(owner.user.id);
          }}
          className="rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm text-white"
        >
          Mock Owner Leave
        </button>
      </div> */}

      {/* TABLE + SEATS */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          <TableCenter canStart={canStart} onStart={() => {}} />
          <SeatsLayer players={players} onJoinNext={handleJoinNext} onLeave={handleLeave} />
        </div>
      </div>
    </div>
  );
}
