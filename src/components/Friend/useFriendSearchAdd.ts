import { useState } from 'react';

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
  sentRequestIds: string[];
};

export type FriendSearchAddActions = {
  setSearchText: (value: string) => void;
  handleSearch: () => void;
  handleSendRequest: (otherUserId: string) => Promise<void>;
};

export const useFriendSearchAdd = (): FriendSearchAddState & FriendSearchAddActions => {
  const [searchText, setSearchText] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [sentRequestIds, setSentRequestIds] = useState<string[]>([]);
  const { userId } = useUserStore();

  const normalizedInput = searchText.trim();
  const normalizedSearch = submittedSearch;

  const { data: searchedUsers = [], isFetching } = useSearchUsersQuery(userId, normalizedSearch, {
    enabled: Boolean(userId && normalizedSearch)
  });

  const { mutateAsync: sendFriendRequest, isPending: isSendingRequest } =
    useSendFriendRequestMutation();

  const handleSearch = () => {
    setSubmittedSearch(searchText.trim());
  };

  const handleSendRequest = async (otherUserId: string) => {
    if (sentRequestIds.includes(otherUserId) || !userId) return;
    await sendFriendRequest({ userId, otherUserId });
    setSentRequestIds((prev) => [...prev, otherUserId]);
  };

  return {
    searchText,
    normalizedInput,
    hasQuery: Boolean(normalizedSearch),
    isFetching,
    isSendingRequest,
    searchedUsers,
    sentRequestIds,
    setSearchText,
    handleSearch,
    handleSendRequest
  };
};
