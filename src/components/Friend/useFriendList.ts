import { useState } from "react";

import { useGetFriendListDataQuery, useRemoveFriendshipMutation } from "@/shared/api/directorApi";
import { useUserStore } from "@/shared/stores/useUserStore";

export type FriendItem = {
  id: string;
  displayName: string;
  username: string;
  imageUrl: string;
  status: "ONLINE" | "IN_GAME" | "IN_ROOM" | "OFFLINE";
};

const STATUS_CLASSES: Record<FriendItem["status"], string> = {
  ONLINE: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  IN_GAME: "border-rave-red/50 bg-rave-red/20 text-rave-white",
  IN_ROOM: "border-amber-300/40 bg-amber-300/15 text-amber-200",
  OFFLINE: "border-rave-white/20 bg-rave-white/10 text-rave-white/60",
};

export const useFriendList = () => {
  const [removingFriendId, setRemovingFriendId] = useState<string | null>(null);
  const username = useUserStore((state) => state.username);
  const {
    data: socialFriends = [],
    isFetching,
    isError,
    error,
    refetch: refetchFriends,
  } = useGetFriendListDataQuery({
    enabled: Boolean(username),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
  const { mutateAsync: removeFriendship, isPending: isRemovingFriend } =
    useRemoveFriendshipMutation();

  const friends: FriendItem[] = socialFriends.map((friend) => {
    const friendusername =
      (friend as { username?: string }).username ?? friend.id;
    const friendDisplayName =
      (friend as { displayName?: string }).displayName ?? friendusername;
    const normalizedStatus = friend.status.toUpperCase();
    const mappedStatus: FriendItem["status"] =
      normalizedStatus === "INMATCH"
        ? "IN_GAME"
        : normalizedStatus === "INROOM"
          ? "IN_ROOM"
          : normalizedStatus === "ONLINE"
            ? "ONLINE"
            : "OFFLINE";

    return {
      id: friend.id,
      displayName: friendDisplayName,
      username: friendusername,
      imageUrl: friend.avatarUrl ?? "",
      status: mappedStatus,
    };
  });

  const handleRemoveFriend = async (otherUserId: string) => {
    if (!otherUserId) {
      return;
    }

    setRemovingFriendId(otherUserId);
    try {
      await removeFriendship({ otherUserId });
    } finally {
      setRemovingFriendId(null);
    }
  };

  return {
    friends,
    isFetching,
    isError,
    error,
    isRemovingFriend,
    removingFriendId,
    handleRemoveFriend,
    refetchFriends,
    STATUS_CLASSES,
  };
};
