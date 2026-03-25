import { useState } from 'react';

import {
  useListFriendRequestsQuery,
  useRespondFriendRequestMutation
} from '@/shared/api/directorApi';
import { useUserStore } from '@/shared/stores/useUserStore';

export type PendingDirection = 'incoming' | 'outgoing' | 'unknown';

type PendingUser = {
  id: string;
  avatarUrl?: string | null;
  relationship?: string;
  requestFriendStatus?: string | null;
  rudexUserId?: string | null;
  userId?: string | null;
  otherUserId?: string | null;
};

export type PendingRequestItem = {
  id: string;
  avatarUrl?: string | null;
  relationship?: string;
  requestFriendStatus?: string | null;
  rudexUserId?: string | null;
  userId?: string | null;
  otherUserId?: string | null;
  displayName: string;
  direction: PendingDirection;
};

const resolvePendingDirection = (
  pendingUser: PendingUser,
  currentUserId: string
): PendingDirection => {
  if (pendingUser.userId && pendingUser.otherUserId) {
    if (pendingUser.userId === currentUserId) {
      return 'outgoing';
    }
    if (pendingUser.otherUserId === currentUserId) {
      return 'incoming';
    }
  }

  return 'unknown';
};

export const useFriendPendingRequests = () => {
  const [pendingActionError, setPendingActionError] = useState('');
  const { userId } = useUserStore();

  const {
    data: socialRequests = [],
    isFetching,
    isError,
    error
  } = useListFriendRequestsQuery(userId, { enabled: Boolean(userId) });

  const { mutateAsync: respondFriendRequest, isPending: isRespondingRequest } =
    useRespondFriendRequestMutation();

  const filteredPendingRequests = socialRequests.filter((item) => {
    const normalizedRequestState = String(
      (item as { relationship?: string; requestFriendStatus?: string }).relationship ??
        (item as { relationship?: string; requestFriendStatus?: string }).requestFriendStatus ??
        ''
    ).toUpperCase();

    return normalizedRequestState.includes('PENDING');
  });

  const pendingRequests =
    filteredPendingRequests.length > 0 ? filteredPendingRequests : socialRequests;

  const pendingRequestItems: PendingRequestItem[] = pendingRequests.map((item) => {
    const pendingUser = item as PendingUser;
    const direction = resolvePendingDirection(pendingUser, userId);

    return {
      ...item,
      userId: pendingUser.userId,
      otherUserId: pendingUser.otherUserId,
      displayName: pendingUser.rudexUserId ?? item.id,
      direction
    };
  });

  const handleRespondPendingRequest = async (
    otherUserId: string,
    action: 'Accepted' | 'Canceled'
  ) => {
    if (!userId) return;

    setPendingActionError('');

    try {
      await respondFriendRequest({
        userId,
        otherUserId,
        action,
        invalidateUserIds: [userId]
      });
    } catch (error) {
      if (error instanceof Error) {
        setPendingActionError(error.message);
      } else {
        setPendingActionError('Cannot process incoming request.');
      }
    }
  };

  const handleCancelPendingRequest = async (otherUserId: string) => {
    if (!userId) {
      return;
    }

    setPendingActionError('');

    try {
      await respondFriendRequest({
        userId: otherUserId,
        otherUserId: userId,
        action: 'Canceled',
        invalidateUserIds: [userId]
      });
    } catch (error) {
      if (error instanceof Error) {
        setPendingActionError(error.message);
      } else {
        setPendingActionError('Cannot cancel outgoing request. Backend may not support cancel yet.');
      }
    }
  };

  return {
    pendingRequestItems,
    isFetching,
    isError,
    error,
    isRespondingRequest,
    pendingActionError,
    handleRespondPendingRequest,
    handleCancelPendingRequest
  };
};
