import { useState } from 'react';

import type { SocialUserDto } from '@/gen/director';
import {
  useGetFriendPendingDataQuery,
  useRespondFriendRequestMutation
} from '@/shared/api/directorApi';
import { useUserStore } from '@/shared/stores/useUserStore';

export type PendingDirection = 'incoming' | 'outgoing' | 'unknown';

type PendingUser = {
  displayName?: string | null;
  avatarUrl?: string | null;
  relationship?: string;
  requestFriendStatus?: string | null;
  username?: string | null;
  direction?: SocialUserDto['direction'];
};

export type PendingRequestItem = {
  id: string;
  displayName: string;
  avatarUrl?: string | null;
  relationship?: string;
  username: string;
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
  const username = useUserStore((state) => state.username);

  const clearPendingActionError = () => {
    setPendingActionError('');
  };

  const {
    data: socialRequests = [],
    isFetching,
    isError,
    error,
    refetch: refetchPendingRequests
  } = useGetFriendPendingDataQuery(username, {
    enabled: Boolean(username),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true
  });

  const { mutateAsync: respondFriendRequest, isPending: isRespondingRequest } =
    useRespondFriendRequestMutation(username);

  const filteredPendingRequests = socialRequests.filter((item) => {
    const normalizedRequestState = String(item.relationship ?? '').toUpperCase();

    return normalizedRequestState.includes('PENDING');
  });

  const pendingRequests =
    filteredPendingRequests.length > 0 ? filteredPendingRequests : socialRequests;

  const pendingRequestItems: PendingRequestItem[] = pendingRequests.map((item) => {
    const pendingUser = item as PendingUser;
    const direction = resolvePendingDirection(pendingUser);
    const usernameValue = pendingUser.username?.trim() ?? '';

    return {
      id: usernameValue,
      displayName: pendingUser.displayName ?? pendingUser.username ?? usernameValue,
      avatarUrl: item.avatarUrl,
      relationship: item.relationship,
      username: usernameValue,
      direction
    };
  });

  const handleRespondPendingRequest = async (
    otherUsername: string,
    action: 'Accepted' | 'Canceled'
  ) => {
    setPendingActionError('');

    try {
      await respondFriendRequest({
        otherUsername,
        action
      });
      await refetchPendingRequests();
    } catch (error) {
      if (error instanceof Error) {
        setPendingActionError(error.message);
      } else {
        setPendingActionError('Cannot process incoming request.');
      }
    }
  };

  const handleCancelPendingRequest = async (otherUsername: string) => {
    if (!otherUsername) {
      return;
    }

    setPendingActionError('');

    try {
      await respondFriendRequest({
        otherUsername,
        action: 'Canceled'
      });
      await refetchPendingRequests();
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
    clearPendingActionError,
    handleRespondPendingRequest,
    handleCancelPendingRequest,
    refetchPendingRequests
  };
};
