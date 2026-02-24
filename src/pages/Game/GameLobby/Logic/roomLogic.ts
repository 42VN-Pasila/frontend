import type { Player, SeatIndex, SeatPos, User } from "../Type/types";

export const POS_BY_SEAT: Record<SeatIndex, SeatPos> = {
  1: "bottom",
  2: "left",
  3: "top",
  4: "right",
};

const MAX_PLAYERS = 4;

function isRoomFull(players: Player[]) {
  return players.length >= MAX_PLAYERS;
}

function sortBySeat(a: Player, b: Player) {
  return a.seat.SeatIndex - b.seat.SeatIndex;
}

function nextSeat(seat: SeatIndex): SeatIndex {
  return (((seat % 4) + 1) as SeatIndex);
}

export function getNextAvailableSeat(players: Player[]): SeatIndex | null {
  const used = new Set<SeatIndex>(players.map((p) => p.seat.SeatIndex));
  for (const seat of [1, 2, 3, 4] as SeatIndex[]) {
    if (!used.has(seat)) return seat;
  }
  return null;
}

export function getPlayerByPos(players: Player[], pos: SeatPos): Player | undefined {
  return players.find((p) => p.seat.SeatPos === pos);
}
export function makeOwner(ownerUser: User): Player {
  return {
    user: ownerUser,
    seat: {
      SeatIndex: 1,
      SeatPos: POS_BY_SEAT[1],
    },
    isOwner: true,
  };
}

export function resetToOwner(ownerUser: User): Player[] {
  return [makeOwner(ownerUser)];
}

export function joinUser(players: Player[], user: User): Player[] {
  if (isRoomFull(players)) return players;

  const existed = players.some((p) => p.user.id === user.id);
  if (existed) return players;

  const seat = getNextAvailableSeat(players);
  if (seat === null) return players;

  const next: Player = {
    user,
    seat: {
      SeatIndex: seat,
      SeatPos: POS_BY_SEAT[seat],
    },
    isOwner: false,
  };

  return [...players, next].sort(sortBySeat);
}

export function joinNext(players: Player[], pool: User[]): Player[] {
  if (isRoomFull(players)) return players;

  const nextUser = pool.find((u) => !players.some((p) => p.user.id === u.id));
  if (!nextUser) return players;

  return joinUser(players, nextUser);
}

export function leaveUser(players: Player[], userId: number): Player[] {
  return players.filter((p) => p.user.id !== userId);
}

function pickNextOwner(remaining: Player[], leavingSeat: SeatIndex): Player {
  let seat = nextSeat(leavingSeat);
  for (let i = 0; i < 4; i++) {
    const candidate = remaining.find((p) => p.seat.SeatIndex === seat);
    if (candidate) return candidate;
    seat = nextSeat(seat);
  }
  return remaining[0];
}

export function leaveAndMigrateOwner(players: Player[], userId: number): Player[] {
  const leaving = players.find((p) => p.user.id === userId);
  if (!leaving) return players;

  const remaining = players.filter((p) => p.user.id !== userId);
  if (remaining.length === 0) return [];

  const sorted = [...remaining].sort(sortBySeat);
  if (!leaving.isOwner) return sorted;
  const nextOwner = pickNextOwner(sorted, leaving.seat.SeatIndex);
  const nextOwnerId = nextOwner.user.id;
  return sorted.map((p) => ({
    ...p,
    isOwner: p.user.id === nextOwnerId,
  }));
}