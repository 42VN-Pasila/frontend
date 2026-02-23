import { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import LobbyBackGround from "../common/assets/LobbyBackGround.jpg";

import SeatsLayer from "./components/SeatsLayer";
import TableCenter from "./components/TableCenter";
import { TopLeftIcons, TopRightIcons } from "./components/TopIcons";
import { MOCK_USERS } from "./mockUsers";
import { joinNext, leaveAndMigrateOwner, resetToOwner } from "./roomLogic";
import type { Player, User } from "./types";

export default function GameLobby() {
  const params = useParams();
  const roomId = params.roomId ?? "????";

  const ownerUser = useMemo<User>(() => MOCK_USERS[3], []);
  const myUserId = ownerUser.id;

  const [players, setPlayers] = useState<Player[]>(() =>
    resetToOwner(ownerUser),
  );

  function handleJoinNext() {
    setPlayers((prev) => joinNext(prev, MOCK_USERS)); // hoặc joinQueue
  }

  function handleLeave(userId: number) {
    setPlayers((prev) => {
      const next = leaveAndMigrateOwner(prev, userId);
      if (next.length === 0) {
        navigate("/createRoom");
      }
      return next;
    });
  }

  function handleStart() {
    if (canStart) return;
  }

  const ownerNow = players.find((p) => p.isOwner);
  const isMeOwner = ownerNow ? ownerNow.user.id === myUserId : false;
// canStart tuỳ bạn: thường start khi đủ người hoặc luôn cho start
const canStart = isMeOwner; // hoặc players.length >= 2, etc.
  // const canStart = ownerNow ? ownerNow.user.id === myUserId : false;
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <img
        src={LobbyBackGround}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <TopLeftIcons roomId={roomId} playerCount={players.length} />
      <TopRightIcons onClose={() => navigate("/createRoom")} />
      <div className="absolute inset-0 grid place-items-center z-100">
        <div className="relative">
          <TableCenter canStart={canStart} onStart={handleStart} isOwner={isMeOwner} onJoin={handleJoinNext}/>
          <SeatsLayer
            players={players}
            onJoinNext={handleJoinNext}
            onLeave={handleLeave}
          />
        </div>
      </div>
    </div>
  );
}
