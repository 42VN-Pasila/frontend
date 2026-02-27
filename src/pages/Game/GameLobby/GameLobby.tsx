import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LobbyBackGround from "../common/assets/LobbyBackGround.jpg";
import { getRoom, removePlayer } from "./Logic/roomStore";
import { getOrCreateCurrentUser } from "./Mock/mockIdentity";
import type { Player } from "./Type/types";
import TableCenter from "./components/Layout/TableCenter";
import { TopLeftIcons, TopRightIcons } from "./components/Layout/TopIcons";
import SeatsLayer from "./components/Seat/SeatsLayer";

export default function GameLobby() {
  const navigate = useNavigate();
  const { roomId: rawRoomId } = useParams();

  const roomId = rawRoomId ?? "????";

  const me = useMemo(() => getOrCreateCurrentUser(), []);

  const [players, setPlayers] = useState<Player[]>([]);
  const [ownerId, setOwnerId] = useState<number | null>(null);

  function syncFromStore() {
    const room = getRoom(roomId);
    if (!room) {
      navigate("/roomlist");
      return;
    }
    setPlayers(room.players);
    setOwnerId(room.ownerId);
  }
    
    useEffect(() => {
      syncFromStore();
    }, [roomId]);
    
  const isMeOwner = ownerId !== null && me.id === ownerId;
  const canStart = isMeOwner && players.length === 4;

  // function handleJoin() {
  //   addPlayer(roomId, me);
  //   syncFromStore();
  // }

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "mock_rooms_v1") {
        syncFromStore();
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [roomId]);

  useEffect(() => {
    function onFocus() {
      syncFromStore();
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [roomId]);

  function handleLeave(userId: number) {
    removePlayer(roomId, userId);

    const room = getRoom(roomId);
    if (!room) {
      navigate("/roomlist");
      return;
    }

    if (userId === me.id) {
      navigate("/roomlist");
      return;
    }

    setPlayers(room.players);
    setOwnerId(room.ownerId);
  }

  function handleStart() {
    if (!canStart) return;
    }

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <img
        src={LobbyBackGround}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <TopLeftIcons roomId={roomId} playerCount={players.length} />
      <TopRightIcons onClose={() => navigate("/roomlist")} />

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-[min(1200px,92vw)] h-[min(640px,72vh)]">
          <TableCenter
            canStart={canStart}
            onStart={handleStart}
            isOwner={isMeOwner}
          />

          <SeatsLayer
            players={players}
            // onJoinNext={handleJoin}
            onLeave={handleLeave}
          />
        </div>
      </div>
    </div>
  );
}
