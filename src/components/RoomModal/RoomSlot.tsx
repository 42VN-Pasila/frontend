import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import type { UserDto } from "@/gen/director";
import {
  useDisconnectRoomMutation,
  useGetRoomMetaDataQuery,
  useGetRoomStatusQuery,
  useStartMatchMutation,
  useUpdateUserStatusMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import { useRoomStore } from "@/shared/stores/useRoomStore";
import { useUserStore } from "@/shared/stores/useUserStore";

type SlotStatus = "HOST" | "JOINED" | "EMPTY";
type Slot = {
  id: string;
  username: string;
  status: SlotStatus;
  avatarUrl?: string;
};

export const RoomSlot = () => {
  const navigate = useNavigate();
  const {
    id: roomId,
    ownerUsername,
    users,
    setUsers,
    resetRoom,
    setName,
    setOwnerUsername,
    setConnectionCount,
  } = useRoomStore();
  const { username, avatarUrl } = useUserStore();

  const { data: roomStatus, refetch: refetchRoomStatus } =
    useGetRoomStatusQuery(roomId, {
      enabled: Boolean(roomId),
      pollingInterval: 3_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: "always",
      staleTime: 0,
    });

  useEffect(() => {
    if (roomStatus) {
      setUsers(roomStatus.users);
      setName(roomStatus.name);
      setOwnerUsername(roomStatus.ownerUsername);
      setConnectionCount(roomStatus.connectionCount);
    }
  }, [roomStatus, setUsers, setName, setOwnerUsername, setConnectionCount]);

  const currentOwnerUsername = roomStatus?.ownerUsername ?? ownerUsername;
  const currentUsers = roomStatus?.users ?? users;
  const currentUsername = username.trim();
  // const currentUserName = username || "You";
  const isHost = currentUsername === currentOwnerUsername;
  const { data: roomMetaData } = useGetRoomMetaDataQuery(roomId, {
    enabled: Boolean(roomId && roomStatus?.started),
    refetchOnMount: "always",
    staleTime: 0,
  });

  const { mutateAsync: updateUserStatus } = useUpdateUserStatusMutation();
  const { mutateAsync: startMatch } = useStartMatchMutation();
  const { mutateAsync: disconnectFromRoom } = useDisconnectRoomMutation();

  useEffect(() => {
    if (roomStatus?.started && roomMetaData?.matchId) {
      navigate(`/match/${roomMetaData.matchId}`);
    }
  }, [roomStatus?.started, roomMetaData?.matchId, navigate, roomId]);

  const isUserReady = (targetUsername: string) =>
    currentUsers.some(
      (user) => user.username === targetUsername && user.status === "Ready",
    );

  const handleReady = async () => {
    if (!currentUsername || !roomId) return;

    const currentUser = currentUsers.find(
      (user) => user.username === currentUsername,
    );
    const shouldBeReady = currentUser?.status !== "Ready";
    const nextStatus = shouldBeReady ? "Ready" : "NotReady";

    await updateUserStatus({
      roomId,
      status: nextStatus,
    });
    await refetchRoomStatus();
  };

  const handleStartMatch = async () => {
    if (!currentUsername || !roomId || !isHost) return;
    await startMatch({
      roomId,
    });
  };

  const handleExitRoom = async () => {
    if (!currentUsername || !roomId) return;

    await disconnectFromRoom({
      roomId,
    });
    resetRoom();
  };

  const hostUser = currentUsers.find(
    (user) => user.username === currentOwnerUsername,
  ) as UserDto;
  const joinedUsers = currentUsers.filter(
    (user) => user.username !== currentOwnerUsername,
  );

  const occupiedSlots: Slot[] = [
    {
      id: hostUser.username ?? `host-${currentOwnerUsername || "unknown"}`,
      username: hostUser.username,
      status: "HOST" as const,
      avatarUrl:
        hostUser.username === currentUsername ? avatarUrl : hostUser.avatarUrl,
    },
    ...joinedUsers.map((user) => ({
      id: user.username,
      username: user.username,
      status: "JOINED" as const,
      avatarUrl: user.username === currentUsername ? avatarUrl : user.avatarUrl,
    })),
  ];

  const slots: Slot[] = [...occupiedSlots];
  while (slots.length < 4) {
    slots.push({
      id: `empty-${slots.length + 1}`,
      username: "OPEN SLOT",
      status: "EMPTY" as const,
      avatarUrl: undefined,
    });
  }

  const isReady = !!currentUsername && isUserReady(currentUsername);
  const allReady =
    joinedUsers.length > 0 &&
    joinedUsers.every((user) => user.status === "Ready");

  const isActionButtonDisabled =
    !currentUsername || !roomId || (isHost && !allReady);

  return (
    <>
      <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold tracking-widest">ROOM</h2>
          <p className="text-xs tracking-[0.18em] text-rave-white/60">
            {roomId}
          </p>
        </div>

        <div className="flex items-stretch gap-2">
          <div className="inline-flex h-10 items-center border border-rave-red bg-rave-red/10 px-3 text-xs font-semibold tracking-[0.18em] text-rave-white">
            MAX PLAYERS: 4
          </div>
          <Button
            variant="inverse"
            emphasis="low"
            size="small"
            className="h-10! sm:h-10!"
            onClick={handleExitRoom}
          >
            EXIT
          </Button>

          <Button
            variant="inverse"
            emphasis="high"
            size="small"
            className="h-10! sm:h-10!"
            onClick={handleReady}
            disabled={isActionButtonDisabled}
          >
            {isReady ? "UNREADY" : "READY"}
          </Button>

          {isHost && (
            <Button
              variant="primary"
              emphasis="high"
              size="small"
              className="h-10! sm:h-10!"
              onClick={handleStartMatch}
              disabled={isActionButtonDisabled}
            >
              START
            </Button>
          )}
        </div>
      </header>

      {/* Horizontal slots */}
      <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slots.map((slot) => {
          const isHost = slot.status === "HOST";
          const isJoined = slot.status === "JOINED";

          return (
            <article
              key={slot.id}
              className={[
                "group relative min-w-[180px] flex-1",
                "rounded-lg border-2 px-4 py-4",
                "transition-all duration-300",
                "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-22px_rgba(0,0,0,0.75)]",
                isHost
                  ? "border-rave-red bg-rave-red/10"
                  : isJoined
                    ? "border-rave-white/20 bg-rave-white/10 hover:border-rave-red/60"
                    : "border-rave-white/15 bg-rave-white/5 hover:border-rave-white/25",
              ].join(" ")}
            >
              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0 flex flex-col gap-2">
                  <p className="text-[10px] font-semibold tracking-[0.2em] text-rave-white/60">
                    {slot.status}
                  </p>
                  <Avatar
                    src={slot.avatarUrl}
                    alt={slot.username}
                    className="h-10 w-10"
                  />
                  <p className="mt-2 truncate text-sm font-semibold tracking-wide text-rave-white">
                    {slot.username}
                  </p>
                </div>
              </div>

              {/* status dot */}
              <div className="relative mt-4 flex items-center gap-2 text-xs tracking-[0.18em] text-rave-white/60">
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    isHost
                      ? "bg-rave-red"
                      : isJoined
                        ? isUserReady(slot.id)
                          ? "bg-emerald-400"
                          : "bg-rave-white/70"
                        : "bg-rave-white/25",
                  ].join(" ")}
                />
                <span>
                  {isHost
                    ? slot.id === currentUsername
                      ? "YOU ARE HOST"
                      : "HOST"
                    : isJoined
                      ? isUserReady(slot.id)
                        ? "READY"
                        : "NOT READY"
                      : "WAITING…"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};
