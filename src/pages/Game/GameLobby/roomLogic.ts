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

export function getPlayerByPos(players: Player[], pos: SeatPos): Player | undefined {
  return players.find((p) => p.pos === pos);
}

export function joinNext(players: Player[], joinQueue: User[]): Player[] {
  if (players.length >= 4) return players;

  const nextSeat = (players.length + 1) as SeatIndex;
  const joinedWithoutOwner = players.length - 1; // 0..2
  const nextUser = joinQueue[joinedWithoutOwner];
  if (!nextUser) return players;

  const existed = players.find((p) => p.user.id === nextUser.id);
  if (existed) return players;

  const nextPlayer: Player = {
    user: nextUser,
    seat: nextSeat,
    pos: POS_BY_SEAT[nextSeat],
    isOwner: false,
  };

  return [...players, nextPlayer];
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
