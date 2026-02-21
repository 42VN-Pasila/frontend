// import React, { useMemo, useState } from "react";
// import Ed from "@assets/Ed.png";
// import Edd from "@assets/Edd.png";
// import Eddy from "@assets/Eddy.png";
// import Plank from "@assets/Plank 1.png";
// import { useNavigate, useParams } from "react-router-dom";
// type User = { id: number; username: string; avatarUrl: string };
// type SeatIndex = 1 | 2 | 3 | 4;
// type Player = {
//   user: User;
//   seat: SeatIndex;
//   isOwner: boolean;
// };
// const MOCK_USERS: User[] = [
// { id: 4, username: "Huong", avatarUrl: Ed },
//   { id: 2, username: "Tan", avatarUrl: Edd },
//   { id: 3, username: "Triet", avatarUrl: Eddy },
//   { id: 1, username: "Kha", avatarUrl: Plank },
// ];
// function SeatCard({
//   seat,
//   player,
//   canJoin,
//   onJoin,
// }: {
//   seat: SeatIndex;
//   player?: Player;
//   canJoin: boolean;
//   onJoin: () => void;
// }) {
//   if (player) {
//     return (
//       <div className="relative flex h-40 items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur">
//         <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/80">
//           Seat {seat}
//           {player.isOwner ? " • Owner" : ""}
//         </div>
//         <div className="text-center">
//           <div className="text-xl font-extrabold tracking-wide text-white">
//             {player.user.username}
//           </div>
//           <div className="mt-1 text-sm text-white/70">id: {player.user.id}</div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <button
//       type="button"
//       onClick={onJoin}
//       disabled={!canJoin}
//       className={[
//         "relative flex h-40 items-center justify-center rounded-2xl border-2 border-dashed p-4",
//         "transition active:scale-[0.99]",
//         canJoin
//           ? "border-white/25 bg-white/5 hover:bg-white/10"
//           : "cursor-not-allowed border-white/10 bg-white/5 opacity-50",
//       ].join(" ")}
//     >
//       <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/80">
//         Seat {seat}
//       </div>
//       <div className="text-center">
//         <div className="text-6xl font-black leading-none text-white">+</div>
//         <div className="mt-2 text-sm text-white/70">Join</div>
//       </div>
//     </button>
//   );
// }
// export default function RoomLobby() {
//   const navigate = useNavigate();
//   const params = useParams();
//   const roomId = params.roomId; // string | undefined
//   const [players, setPlayers] = useState<Player[]>(() => {
//     // giả sử: khi vào room, owner đã có sẵn
//     const owner = MOCK_USERS.find((u) => u.id === 1);
//     if (!owner) return [];
//     return [{ user: owner, seat: 1, isOwner: true }];
//   });
//   const joinUsers = useMemo(() => MOCK_USERS.filter((u) => u.id !== 1), []);
//   const canJoin = players.length < 4;
//   function leaveRoom() {
//     navigate(-1);
//   }
//   function joinNext() {
//     if (!canJoin) return;
//     const joinedWithoutOwner = players.length - 1; // 0..2
//     const nextUser = joinUsers[joinedWithoutOwner];
//     if (!nextUser) return;
//     const nextSeat = (players.length + 1) as SeatIndex; // 2..4
//     setPlayers([
//       ...players,
//       { user: nextUser, seat: nextSeat, isOwner: false },
//     ]);
//   }
//   const playerBySeat = (seat: SeatIndex) =>
//     players.find((p) => p.seat === seat);
//   return (
//     <div className="min-h-screen w-full px-4 py-10 grid place-items-center">
//       <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur">
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <div className="text-sm font-semibold tracking-widest text-white/70">
//               ROOM #{roomId ?? "?"}
//             </div>
//             <div className="mt-1 text-3xl font-extrabold text-white">
//               Game Lobby
//             </div>
//             <div className="mt-2 text-sm text-white/70">
//               Players:{" "}
//               <span className="font-semibold text-white">{players.length}</span>
//               /4
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={leaveRoom}
//             className="rounded-2xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-black/40 active:scale-[0.99]"
//           >
//             Leave Room
//           </button>
//         </div>
//         <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
//           <SeatCard
//             seat={1}
//             player={playerBySeat(1)}
//             canJoin={false}
//             onJoin={() => {}}
//           />
//           <SeatCard
//             seat={2}
//             player={playerBySeat(2)}
//             canJoin={canJoin}
//             onJoin={joinNext}
//           />
//           <SeatCard
//             seat={3}
//             player={playerBySeat(3)}
//             canJoin={canJoin}
//             onJoin={joinNext}
//           />
//           <SeatCard
//             seat={4}
//             player={playerBySeat(4)}
//             canJoin={canJoin}
//             onJoin={joinNext}
//           />
//         </div>
//         <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-white/60">
//           <div>{players.length >= 4 ? "Room full" : "Tap + to join"}</div>
//           <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
//             {players.length >= 4 ? "Ready" : "Waiting..."}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

import { RoomId } from "@/shared/api/roomId";

const roomId = await RoomId();

function OpenSeat({
  label,
  className,
  onClick,
}: {
  label: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group absolute flex flex-col items-center gap-2",
        "select-none",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "h-16 w-16 rounded-2xl",
          "bg-white/10 border border-white/20",
          "shadow-lg backdrop-blur",
          "grid place-items-center",
          "transition group-hover:scale-[1.03] group-active:scale-[0.99]",
        ].join(" ")}
      >
        <span className="text-3xl leading-none text-white/90">+</span>
      </div>

      <div className="rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80">
        {label}
      </div>
    </button>
  );
}

function TopLeftBadge() {
  return (
    <div className="absolute left-6 top-6 rounded-2xl bg-black/35 px-4 py-3 text-white shadow-lg backdrop-blur">
      <div className="text-xs font-extrabold tracking-widest">
        Room: {roomId}
      </div>
    </div>
  );
}

function TopRightIcons() {
  return (
    <div className="absolute right-6 top-6 flex items-center gap-3">
      <button className="h-12 w-12 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur grid place-items-center">
        👥
      </button>
      <button className="h-12 w-12 rounded-full bg-white/10 border border-white/15 shadow-lg backdrop-blur grid place-items-center">
        X
      </button>
    </div>
  );
}

function OwnerPanel({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={["absolute flex items-end gap-4", className ?? ""].join(" ")}
    >
      <div className="relative">
        <div className="h-20 w-20 rounded-full bg-white/10 border-4 border-yellow-400/70 shadow-xl grid place-items-center">
          <span className="text-3xl">👤</span>
        </div>
        <div className="absolute -right-2 -top-2 h-7 w-7 rounded-full bg-sky-400 shadow-lg grid place-items-center text-xs">
          🏠
        </div>
      </div>

      <div className="rounded-2xl bg-black/35 px-4 py-2 shadow-lg backdrop-blur border border-white/10">
        <div className="text-sm font-extrabold text-white">{name}</div>
      </div>
    </div>
  );
}

export default function GameLobby() {
  const showTop = true;
  const showLeft = true;
  const showRight = true;
  const showBottom = true;

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_20%,#d3a469,transparent_60%),linear-gradient(to_bottom,#2b1c12,#0b0a0f)]" />
      <div className="absolute inset-0 bg-black/40" />

      <TopLeftBadge />
      <TopRightIcons />

      {/* TABLE */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          {/* mặt bàn */}
          <div
            className={[
              "w-[min(1200px,92vw)] h-[min(640px,72vh)]",
              "rounded-[999px]",
              "bg-[#caa26c]/90",
              "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
              "border border-black/20",
            ].join(" ")}
          >
            {/* viền đỏ cong */}
            <div className="absolute inset-0 rounded-[999px]">
              <div className="absolute inset-6 rounded-[999px] border-[10px] border-transparent ring-2 ring-red-900/40" />
              <div className="absolute inset-10 rounded-[999px] border border-black/10" />
            </div>

            {/* watermark ở giữa */}
            <div className="absolute inset-0 grid place-items-center opacity-20">
              <div className="text-6xl">♠︎</div>
            </div>
          </div>

          {/* OPEN SEATS (top/left/right) */}
          {showTop && (
            <OpenSeat
              label="OPEN SEAT"
              className="left-1/2 -top-6 -translate-x-1/2"
              onClick={() => {}}
            />
          )}

          {showLeft && (
            <OpenSeat
              label="OPEN SEAT"
              className="-left-6 top-1/2 -translate-y-1/2"
              onClick={() => {}}
            />
          )}

          {showRight && (
            <OpenSeat
              label="OPEN SEAT"
              className="-right-6 top-1/2 -translate-y-1/2"
              onClick={() => {}}
            />
          )}

          {showBottom && (
            <OwnerPanel name="Immemdi" className="left-8 -bottom-8" />
          )}
        </div>
      </div>
    </div>
  );
}
