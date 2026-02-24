import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LobbyBackGround from "../common/assets/LobbyBackGround.jpg";
import { joinNext,leaveAndMigrateOwner, resetToOwner} from "./Logic/roomLogic";
import { MOCK_USERS } from "./Mock/mockUsers";
import type { Player, User } from "./Type/types";
import TableCenter from "./components/Layout/TableCenter";
import { TopLeftIcons, TopRightIcons } from "./components/Layout/TopIcons";
import SeatsLayer from "./components/Seat/SeatsLayer";

export default function GameLobby() {
  const navigate = useNavigate();

  const params = useParams();
  const roomId = params.roomId ?? "????";

  const MOCK_OWNER = Math.floor(Math.random() * 3 + 1);

  const roomOwner = useMemo<User>(() => MOCK_USERS[MOCK_OWNER], [MOCK_OWNER]);
  const [players, setPlayers] = useState<Player[]>(() =>
    resetToOwner(roomOwner),
  );

  // POV viewer
  const [me, setMe] = useState<User>(() => roomOwner);
  const myUserId = me.id;

  function handleJoinNext() {
    setPlayers((prev) => joinNext(prev, MOCK_USERS));
  }

  function handleLeave(userId: number) {
    const next = leaveAndMigrateOwner(players, userId);

    if (next.length === 0) {
      setPlayers(next);
      navigate("/createRoom");
      return;
    }

    setPlayers(next);

    if (userId === myUserId) {
      const newOwner = next.find((p) => p.isOwner);
      if (newOwner) setMe(newOwner.user);
    }
  }

  const ownerNow = players.find((p) => p.isOwner);
  const isMeOwner = ownerNow ? ownerNow.user.id === myUserId : false;
  const canStart = isMeOwner && players.length === 4;

  function handleStart() {
    if (!canStart) return;
    // TODO: websocket start
  }

  const povUsers = MOCK_USERS;

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <img
        src={LobbyBackGround}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <TopLeftIcons roomId={roomId} playerCount={players.length} />

      {/* Test POV */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] text-(--color-primary)">
        <select
          value={myUserId}
          onChange={(e) => {
            const id = Number(e.target.value);
            const u = povUsers.find((x) => x.id === id);
            if (u) setMe(u);
          }}
          className="px-2 py-1 rounded"
        >
          {povUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      <TopRightIcons onClose={() => navigate("/createRoom")} />

      <div className="absolute inset-0 grid place-items-center z-100">
        <div className="relative">
          <TableCenter
            canStart={canStart}
            onStart={handleStart}
            isOwner={isMeOwner}
            onJoin={handleJoinNext}
          />
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
