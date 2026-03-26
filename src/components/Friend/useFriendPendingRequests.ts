import { useState } from 'react';

import type { SocialUserDto } from '@/gen/director';
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
  direction?: SocialUserDto['direction'];
};

export type PendingRequestItem = {
  id: string;
  avatarUrl?: string | null;
  relationship?: string;
  rudexUserId: string;
  direction: PendingDirection;
};

const resolvePendingDirection = (pendingUser: PendingUser): PendingDirection => {
  if (pendingUser.direction === 'Out') {
    return 'outgoing';
  }

  if (pendingUser.direction === 'In') {
    return 'incoming';
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
    const normalizedRequestState = String(item.relationship ?? '').toUpperCase();

    return normalizedRequestState.includes('PENDING');
  });

  const pendingRequests =
    filteredPendingRequests.length > 0 ? filteredPendingRequests : socialRequests;

  const pendingRequestItems: PendingRequestItem[] = pendingRequests.map((item) => {
    const pendingUser = item as PendingUser;
    const direction = resolvePendingDirection(pendingUser);

    return {
      id: item.id,
      avatarUrl: item.avatarUrl,
      relationship: item.relationship,
      rudexUserId: pendingUser.rudexUserId ?? item.id,
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
        userId,
        otherUserId,
        action: 'Canceled',
        invalidateUserIds: [userId]
      });
    } catch (error) {
      if (error instanceof Error) {
        setPendingActionError(error.message);
      } else {
        setPendingActionError(
          'Cannot cancel outgoing request. Backend may not support cancel yet.'
        );
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
