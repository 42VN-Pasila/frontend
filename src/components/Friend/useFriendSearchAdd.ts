import { useEffect, useState } from 'react';

import type { SocialUserDto } from '@/gen/director';
import { useSearchUsersQuery, useSendFriendRequestMutation } from '@/shared/api/directorApi';
import { useUserStore } from '@/shared/stores/useUserStore';

export type FriendSearchAddState = {
  searchText: string;
  normalizedInput: string;
  hasQuery: boolean;
  isFetching: boolean;
  isSendingRequest: boolean;
  searchedUsers: SocialUserDto[];
  searchTargetId: string[];
  requestError: string | null;
};

export type FriendSearchAddActions = {
  setSearchText: (value: string) => void;
  handleSearch: () => void;
  handleSendRequest: (otherUserId: string) => Promise<void>;
};

export const useFriendSearchAdd = (): FriendSearchAddState & FriendSearchAddActions => {
  const [searchText, setSearchText] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [searchTargetId, setSearchTargetId] = useState<string[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const currentUserId = useUserStore((state) => state.userId);

  const normalizedInput = searchText.trim();
  const normalizedSearch = submittedSearch;

  const {
    data: searchedUsers = [],
    isFetching,
    error: searchError,
    refetch
  } = useSearchUsersQuery(currentUserId, normalizedSearch, {
    enabled: Boolean(currentUserId && normalizedSearch)
  });

  useEffect(() => {
    if (!searchError) return;
    setRequestError(searchError instanceof Error ? searchError.message : 'Failed to search user');
  }, [searchError]);

  const { mutateAsync: sendFriendRequest, isPending: isSendingRequest } =
    useSendFriendRequestMutation();

  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    if (!currentUserId) {
      setRequestError('Missing requesterId. Please login again before searching.');
      return;
    }

    setRequestError(null);
    setSearchTargetId([]);

    if (trimmed === submittedSearch) {
      //request for the exact same term
      void refetch();
    } else {
      setSubmittedSearch(trimmed);
    }
  };

  const handleSendRequest = async (otherUserId: string) => {
    if (searchTargetId.includes(otherUserId) || !currentUserId) return;
    try {
      await sendFriendRequest({ userId: currentUserId, otherUserId });
      setSearchTargetId((prev) => [...prev, otherUserId]);
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Failed to send request');
    }
  };

  return {
    searchText,
    normalizedInput,
    hasQuery: Boolean(normalizedSearch),
    isFetching,
    isSendingRequest,
    searchedUsers,
    searchTargetId,
    setSearchText,
    handleSearch,
    handleSendRequest,
    requestError
  };
};
