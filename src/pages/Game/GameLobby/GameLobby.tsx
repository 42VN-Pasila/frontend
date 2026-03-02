import BackCard from "./assets/game-card-back-2.svg";
import { useNavigate } from "react-router-dom";

import BackGround from "./assets/Background.png";
import FriendList from "./FriendList";
import PlayerRow from "./PlayerRow";
import SButton from "./SButton";
import { RoomInfo, TopRightIcons } from "./TopIcons";
import { useState } from "react";

type User = { id: number; username: string; avatarUrl: string };

function createMockUser(): User {
  const id = Math.floor(Math.random() * 100000) + 1;
  return {
    id,
    username: "User" + id,
    avatarUrl: "https://i.pravatar.cc/120?u=" + id,
  };
}

function getRandomFreeIndex(seats: (User | null)[]): number | null {
  const free: number[] = [];
  let i = 0;
  while (i < seats.length) {
    if (seats[i] === null) free.push(i);
    i++;
  }
  if (free.length === 0) return null;
  const r = Math.floor(Math.random() * free.length);
  return free[r];
}

export default function GameLobby() {
  const roomid = "1234";
  const navigate = useNavigate();

  const [seats, setSeats] = useState<(User | null)[]>([null, null, null, null]);

  function handleJoin() {
    setSeats((prev) => {
      const idx = getRandomFreeIndex(prev);
      if (idx === null) return prev;

      const next = [...prev];
      next[idx] = createMockUser();
      return next;
    });
  }


  return (
    <div
      className="flex h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <aside className="relative w-[25%] right-0  border-r-3  border-(--color-purple-primary) flex flex-row justify-between z-10 ">
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <FriendList onJoin={handleJoin}/>
        <div className="absolute bottom-10 flex w-full items-center justify-center overflow-hidden">
          <SButton color="purple" text="START"/>
        </div>
      </aside>

      <div className="flex flex-1 flex-col relative">
        <TopRightIcons onClose={() => navigate(-1)} />
        <main className=" flex-[7] bg-transparent flex flex-col items-center z-10">
          <RoomInfo roomId={roomid} />
          <PlayerRow seats={seats} backSrc={BackCard} />
        </main>

        <aside className="w-full border-t-3 border-(--color-purple-primary) bg-black/20 flex flex-[3] items-center justify-center z-10 ">
          Live chat
        </aside>

        <div className="absolute inset-0 bg-black/50 "></div>
      </div>
    </div>
  );
}
