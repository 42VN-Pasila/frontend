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
  handleSendRequest: (otherUsername: string) => Promise<void>;
};

export const useFriendSearchAdd = (): FriendSearchAddState & FriendSearchAddActions => {
  const [searchText, setSearchText] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [searchTargetId, setSearchTargetId] = useState<string[]>([]);
  const [requestError, setRequestError] = useState<string | null>(null);
  const username = useUserStore((state) => state.username);

  const normalizedInput = searchText.trim();
  const normalizedSearch = submittedSearch;

  const {
    data: searchedUsers = [],
    isFetching,
    error: searchError,
    refetch
  } = useSearchUsersQuery(normalizedSearch, {
    enabled: Boolean(username && normalizedSearch)
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

    if (!username) {
      setRequestError('Session expired. Please login again before searching.');
      return;
    }

    setRequestError(null);
    setSearchTargetId([]);

    if (trimmed === submittedSearch) {
      void refetch();
    } else {
      setSubmittedSearch(trimmed);
    }
  };

  const handleSendRequest = async (otherUsername: string) => {
    if (searchTargetId.includes(otherUsername) || !username) return;
    try {
      await sendFriendRequest({ otherUsername });
      setSearchTargetId((prev) => [...prev, otherUsername]);
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
