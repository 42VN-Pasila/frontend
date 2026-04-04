import { useState } from 'react';

import { useGetFriendListDataQuery, useRemoveFriendshipMutation } from '@/shared/api/directorApi';
import { useUserStore } from '@/shared/stores/useUserStore';

export type FriendItem = {
  username: string;
  displayName: string;
  imageUrl: string;
  status: 'ONLINE' | 'IN_GAME' | 'IN_ROOM' | 'OFFLINE';
};

const STATUS_CLASSES: Record<FriendItem['status'], string> = {
  ONLINE: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
  IN_GAME: 'border-rave-red/50 bg-rave-red/20 text-rave-white',
  IN_ROOM: 'border-amber-300/40 bg-amber-300/15 text-amber-200',
  OFFLINE: 'border-rave-white/20 bg-rave-white/10 text-rave-white/60'
};

export const useFriendList = () => {
  const [removingFriendId, setRemovingFriendId] = useState<string | null>(null);
  const username = useUserStore((state) => state.username);
  const {
    data: socialFriends = [],
    isFetching,
    isError,
    error,
    refetch: refetchFriends
  } = useGetFriendListDataQuery({
    enabled: Boolean(username),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });
  const { mutateAsync: removeFriendship, isPending: isRemovingFriend } =
    useRemoveFriendshipMutation();

  const friends: FriendItem[] = socialFriends
    .filter((friend) => Boolean(friend.username?.trim()))
    .map((friend) => {
      const friendusername = friend.username?.trim() ?? '';
      const friendDisplayName = friend.displayName?.trim() ?? friendusername;
      const normalizedStatus = friend.status.toUpperCase();
      const mappedStatus: FriendItem['status'] =
        normalizedStatus === 'INMATCH'
          ? 'IN_GAME'
          : normalizedStatus === 'INROOM'
            ? 'IN_ROOM'
            : normalizedStatus === 'ONLINE'
              ? 'ONLINE'
              : 'OFFLINE';

      return {
        username: friendusername,
        displayName: friendDisplayName,
        imageUrl: friend.avatarUrl ?? '',
        status: mappedStatus
      };
    });

  const handleRemoveFriend = async (otherUsername: string) => {
    if (!otherUsername) {
      return;
    }

    setRemovingFriendId(otherUsername);
    try {
      await removeFriendship({ otherUsername });
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
    STATUS_CLASSES
  };
};
