import React, { useState } from "react";
import { Button } from "@/shared/components";

type User = { id: number; username?: string };

const MOCK_USERID: User[] = [
  { id: 1, username: "owner" },
  { id: 2, username: "bob" },
  { id: 3, username: "kate" },
  { id: 4, username: "minh" },
];

type Player = {
  userId: number;
  playerId: number;
  isOwner: boolean;
};

const UserJoined: number[] = [];

type Props = {
  roomId: number;
};

export default function CreateRoom({ roomId }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);

  const handleCreateRoom = () => {
    const owner = MOCK_USERID.find((user) => user.id === 1);
    if (!owner) return;

    setPlayers([
      {
        userId: owner,
        playerId: 1,
        isOwner: true,
      },
    ]);

    UserJoined.push(owner.id);
    console.log("roomId:", roomId, "UserJoined:", UserJoined);
  };

  const handleJoinRoom = () => {
    if (players.length >= 5) return;

    const nextIndex = players.length;
    const nextUser = MOCK_USERID[nextIndex];

    setPlayers([
      ...players,
      {
        userId: nextUser,
        playerId: nextIndex + 1,
        isOwner: false,
      },
    ]);

    UserJoined.push(nextUser.id);
    console.log("roomId:", roomId, "UserJoined:", UserJoined);
  };

  return (
    <div>
      <h2>Game Room</h2>

      {players.length === 0 ? (
        <Button onClick={handleCreateRoom}>Create Room</Button>
      ) : (
        <Button onClick={handleJoinRoom} disabled={players.length >= 4}>
          Join Room
        </Button>
      )}

      <ul>
        {players.map((player) => (
          <li key={player.playerId}>
            Player {player.playerId}: {player.userId.id}{" "}
            {player.isOwner && "(Owner)"}
          </li>
        ))}
      </ul>
    </div>
  );
}