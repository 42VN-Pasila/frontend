import type { Player, User } from '../Type/types';

import { leaveAndMigrateOwner } from './roomLogic';

export type Room = {
  id: string;
  createdAt: number;
  ownerId: number;
  players: Player[];
};

const KEY = 'mock_rooms_v1';

export function readAll(): Room[] {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Room[]) : [];
}

function writeAll(rooms: Room[]) {
  localStorage.setItem(KEY, JSON.stringify(rooms));
}

export function listRooms(): Room[] {
  return readAll().sort((a, b) => b.createdAt - a.createdAt);
}

export function getRoom(roomId: string): Room | undefined {
  return readAll().find((r) => r.id === roomId);
}

export function createRoomWithId(roomId: string, owner: User): Room {
  const rooms = readAll();
  const existed = rooms.find((r) => r.id === roomId);
  if (existed) return existed;

  const room: Room = {
    id: roomId,
    createdAt: Date.now(),
    ownerId: owner.id,
    players: [
      {
        user: owner,
        seat: { SeatIndex: 1, SeatPos: 'bottom' },
        isOwner: true
      }
    ]
  };

  rooms.push(room);
  writeAll(rooms);
  return room;
}

export function removePlayer(roomId: string, userId: number): Room | undefined {
  const rooms = readAll();
  const room = rooms.find((r) => r.id === roomId);
  if (!room) return;

  room.players = leaveAndMigrateOwner(room.players, userId);

  if (room.players.length === 0) {
    writeAll(rooms.filter((r) => r.id !== roomId));
    return;
  }

  const newOwner = room.players.find((p) => p.isOwner);
  if (newOwner) room.ownerId = newOwner.user.id;

  writeAll(rooms);
  return room;
}

export function addPlayer(roomId: string, user: User): Room | undefined {
  const rooms = readAll();
  const room = rooms.find((r) => r.id === roomId);
  if (!room) return;
  if (room.players.some((p) => p.user.id === user.id) || room.players.length >= 4) return room;
  const used = new Set(room.players.map((p) => p.seat.SeatIndex));
  const next = ([1, 2, 3, 4] as const).find((x) => !used.has(x));
  if (!next) return room;
  const posByIndex = { 1: 'bottom', 2: 'left', 3: 'top', 4: 'right' } as const;
  const newPlayer: Player = {
    user,
    seat: { SeatIndex: next, SeatPos: posByIndex[next] },
    isOwner: false
  };

  room.players = [...room.players, newPlayer].sort((a, b) => a.seat.SeatIndex - b.seat.SeatIndex);

  writeAll(rooms);
  return room;
}
