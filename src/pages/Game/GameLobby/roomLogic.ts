// import useNavigate from "react-router-dom";
import type { Player, SeatIndex, SeatPos, User } from "./types";

export const POS_BY_SEAT: Record<SeatIndex, SeatPos> = {
  1: "bottom",
  2: "left",
  3: "top",
  4: "right",
};

function sortBySeatAsc(a: Player, b: Player) {
  if (a.seat < b.seat) return -1;
  if (a.seat > b.seat) return 1;
  return 0;
}

export function getNextAvailableSeat(players: Player[]): SeatIndex | null {
  const used = new Set(players.map((p) => p.seat));
  if (!used.has(1)) return 1;
  if (!used.has(2)) return 2;
  if (!used.has(3)) return 3;
  if (!used.has(4)) return 4;
  return null;
}

export function getPlayerByPos(players: Player[], pos: SeatPos): Player | undefined {
  return players.find((p) => p.pos === pos);
}

export function makeOwner(ownerUser: User): Player {
  return {
    user: ownerUser,
    seat: 1,
    pos: POS_BY_SEAT[1],
    isOwner: true,
  };
}

export function resetToOwner(ownerUser: User): Player[] {
  return [makeOwner(ownerUser)];
}

export function joinUser(players: Player[], user: User): Player[] {
  if (players.length >= 4) return players;

  const existed = players.find((p) => p.user.id === user.id);
  if (existed) return players;

  const seat = getNextAvailableSeat(players);
  if (!seat) return players;

  const next: Player = {
    user,
    seat,
    pos: POS_BY_SEAT[seat],
    isOwner: false,
  };

  return [...players, next];
}
export function joinNext(players: Player[], pool: User[]): Player[] {
  if (players.length >= 4) return players;

  const nextUser = pool.find((u) => !players.some((p) => p.user.id === u.id));
  if (!nextUser) return players;

  return joinUser(players, nextUser);
}

export function leaveUser(players: Player[], userId: number): Player[] {
  return players.filter((p) => p.user.id !== userId);
}

export function leaveAndMigrateOwner(players: Player[], userId: number): Player[] {
  const leaving = players.find((p) => p.user.id === userId);
  if (!leaving) return players;

  const remaining = players.filter((p) => p.user.id !== userId);
  if (remaining.length === 0) return [];

  if (!leaving.isOwner) return remaining;

  const sorted = [...remaining].sort(sortBySeatAsc);
  const newOwner = sorted[0];

  return remaining.map((p) => {
    if (p.user.id === newOwner.user.id) return { ...p, isOwner: true };
    if (p.isOwner) return { ...p, isOwner: false };
    return p;
  });
}