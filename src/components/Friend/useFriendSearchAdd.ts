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
  searchTargetId: string[];
  currentUserId: string;
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
  // const { userId } = useUserStore();
  const currentUserId = useUserStore((state) => state.userId);

  const normalizedInput = searchText.trim();
  const normalizedSearch = submittedSearch;

  const { data: searchedUsers = [], isFetching } = useSearchUsersQuery(currentUserId, normalizedSearch, {
    enabled: Boolean(currentUserId && normalizedSearch)
  });

  const { mutateAsync: sendFriendRequest, isPending: isSendingRequest } =
    useSendFriendRequestMutation();

  const handleSearch = () => {
    setSubmittedSearch(searchText.trim());
  };

  const handleSendRequest = async (otherUserId: string) => {
    if (searchTargetId.includes(otherUserId) || !currentUserId) return;
    await sendFriendRequest({ userId:currentUserId, otherUserId });
    setSearchTargetId((prev) => [...prev, otherUserId]);
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
    currentUserId
  };
};
