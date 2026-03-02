// import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackGround from "./Background.png";
import FriendList from "./FriendList";
import PlayerGrid from "./PlayerGrid";
import StartButton from "./StartButton";
import { RoomInfo, TopRightIcons } from "./components/Layout/TopIcons";

export default function GameLobby() {
  const roomid = "1234";
  // const playerCount = 0;
  const navigate = useNavigate();
  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      {/* LEFT - CHAT */}
      <aside className="w-[20%] border-3 border-(--color-purple-primary) text-center">
        Live chat
      </aside>
      {/* CENTER */}
      <main className="relative flex-1 bg-transparent flex flex-col items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <RoomInfo roomId={roomid} />
        <PlayerGrid />
      </main>

      {/* RIGHT */}
      <aside className="relative w-[25%] bg-(--color-purple-component-bg) flex flex-row justify-between">
        <TopRightIcons onClose={() => navigate(-1)} />
        <FriendList />
        <StartButton />
        {/* <StartPanel /> */}
      </aside>
    </div>
  );
}
