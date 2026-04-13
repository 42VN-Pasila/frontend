import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  Avatar,
  ListRoomsDto,
  RequestFriendRequestBody,
  RespondToFriendRequestRequestBody,
  RespondToFriendRequestResponse,
  RoomDto,
  RoomMetaDataDto,
  SocialUserDto,
  StartMatchResponse,
  UpdateRoomUserStatusRequestBody,
  UpdateRoomUserStatusResponse,
  UpdateUserAvatarRequestBody,
  UpdateUserAvatarResponse,
  UpdateUserDisplayNameRequestBody,
  UpdateUserDisplayNameResponse,
  UserDto
} from '@/gen/director';
import type { ConnectRoomResponse } from '@/gen/director/models/ConnectRoomResponse';
import type { CreateRoomResponse } from '@/gen/director/models/CreateRoomResponse';

import { directorClient } from './directorClient';

const getViewerScopedSearchQueryKey = (viewerUsername: string, query: string) =>
  ['users', viewerUsername, 'search', query] as const;

const getViewerScopedSearchQueryPrefix = (viewerUsername: string) =>
  ['users', viewerUsername, 'search'] as const;

const getViewerScopedFriendsQueryKey = (viewerUsername: string) =>
  ['users', viewerUsername, 'friends'] as const;

const getViewerScopedFriendRequestsQueryKey = (viewerUsername: string) =>
  ['users', viewerUsername, 'friend-requests'] as const;

//------------------------------------------------
// QUERIES
//------------------------------------------------

export const useGetUserByUsernameQuery = (username: string, options?: { enabled?: boolean }) => {
  const normalizedUsername = username.trim();

  return useQuery<UserDto>({
    queryKey: ['users', normalizedUsername],
    queryFn: () => directorClient.getUserByUsername(normalizedUsername),
    enabled: (options?.enabled ?? true) && Boolean(normalizedUsername)
  });
};

export const useListRoomsQuery = () => {
  return useQuery<ListRoomsDto[]>({
    queryKey: ['rooms'],
    queryFn: () => directorClient.listRooms(),
    refetchInterval: 3_000,
    refetchOnWindowFocus: true
  });
};

export const useListAvatarsQuery = () => {
  return useQuery<Avatar[]>({
    queryKey: ['avatars'],
    queryFn: () => directorClient.listAvatars()
  });
};

export const useSearchUsersQuery = (
  query: string,
  viewerUsername: string,
  options?: { enabled?: boolean }
) => {
  const normalizedQuery = query.trim();
  const normalizedViewerUsername = viewerUsername.trim();

  return useQuery<SocialUserDto[]>({
    queryKey: getViewerScopedSearchQueryKey(normalizedViewerUsername, normalizedQuery),
    queryFn: () => directorClient.searchUsers(normalizedQuery),
    enabled: (options?.enabled ?? true) && Boolean(normalizedViewerUsername && normalizedQuery)
  });
};

//------------------------------------------------
// MUTATIONS
//------------------------------------------------

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRoomResponse, Error, { roomName: string }>({
    mutationFn: async ({ roomName }) => {
      const bodyPayload: { roomName: string } = { roomName };
      return directorClient.createRoom(bodyPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useConnectRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ConnectRoomResponse, Error, { roomId: string }>({
    mutationFn: async ({ roomId }) => {
      return directorClient.connectRoom(roomId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useStartMatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<StartMatchResponse, Error, { roomId: string }>({
    mutationFn: ({ roomId }) => {
      return directorClient.startMatch(roomId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useUpdateUserAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserAvatarResponse, Error, { avatarId: string }>({
    mutationFn: ({ avatarId }) => {
      const bodyPayload: UpdateUserAvatarRequestBody = { avatarId };
      return directorClient.updateUserAvatar(bodyPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useDisconnectRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { roomId: string }>({
    mutationFn: ({ roomId }) => {
      return directorClient.disconnectRoom(roomId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateRoomUserStatusResponse,
    Error,
    { roomId: string; status: 'Ready' | 'NotReady' }
  >({
    mutationFn: ({ roomId, status }) => {
      const bodyPayload: UpdateRoomUserStatusRequestBody = {
        status: status as UpdateRoomUserStatusRequestBody.status
      };

      return directorClient.updateUserStatus(roomId, bodyPayload);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useUpdateUserDisplayNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateUserDisplayNameResponse,
    Error,
    { displayName: string }
  >({
    mutationFn: ({ displayName }) => {
      const bodyPayload: UpdateUserDisplayNameRequestBody = { displayName };
      return directorClient.updateUserDisplayName(bodyPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useSendFriendRequestMutation = (viewerUsername: string) => {
  const queryClient = useQueryClient();
  const normalizedViewerUsername = viewerUsername.trim();

  return useMutation<void, Error, { otherUsername: string }>({
    mutationFn: ({ otherUsername }) => {
      const bodyPayload: RequestFriendRequestBody = { otherUsername };
      return directorClient.sendFriendRequest(bodyPayload);
    },
    onSuccess: () => {
      if (!normalizedViewerUsername) return;

      queryClient.invalidateQueries({
        queryKey: getViewerScopedSearchQueryPrefix(normalizedViewerUsername)
      });
      queryClient.invalidateQueries({
        queryKey: getViewerScopedFriendRequestsQueryKey(normalizedViewerUsername)
      });
    }
  });
};

export const useRespondFriendRequestMutation = (viewerUsername: string) => {
  const queryClient = useQueryClient();
  const normalizedViewerUsername = viewerUsername.trim();

  return useMutation<
    RespondToFriendRequestResponse,
    Error,
    {
      otherUsername: string;
      action: 'Accepted' | 'Canceled';
    }
  >({
    mutationFn: ({ otherUsername, action }) => {
      const bodyPayload: RespondToFriendRequestRequestBody = {
        action: action as RespondToFriendRequestRequestBody.action
      };

      return directorClient.respondFriendRequest(otherUsername, bodyPayload);
    },
    onSuccess: () => {
      if (!normalizedViewerUsername) return;

      queryClient.invalidateQueries({
        queryKey: getViewerScopedFriendRequestsQueryKey(normalizedViewerUsername)
      });
      queryClient.invalidateQueries({
        queryKey: getViewerScopedFriendsQueryKey(normalizedViewerUsername)
      });
      queryClient.invalidateQueries({
        queryKey: getViewerScopedSearchQueryPrefix(normalizedViewerUsername)
      });
    }
  });
};

export const useRemoveFriendshipMutation = (viewerUsername: string) => {
  const queryClient = useQueryClient();
  const normalizedViewerUsername = viewerUsername.trim();

  return useMutation<void, Error, { otherUsername: string }>({
    mutationFn: ({ otherUsername }) => {
      return directorClient.removeFriendship(otherUsername);
    },
    onSuccess: async (_data, variables) => {
      if (!normalizedViewerUsername) return;

      const friendsQueryKey = getViewerScopedFriendsQueryKey(normalizedViewerUsername);

      queryClient.setQueryData<SocialUserDto[]>(friendsQueryKey, (prev = []) =>
        prev.filter((friend) => friend.username !== variables.otherUsername)
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: friendsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: getViewerScopedSearchQueryPrefix(normalizedViewerUsername)
        }),
        queryClient.refetchQueries({ queryKey: friendsQueryKey, type: 'active' })
      ]);
    }
  });
};

//------------------------------------------------
// POLLING QUERIES
//------------------------------------------------

type QueryOptions = {
  enabled?: boolean;
  pollingInterval?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean | 'always';
  staleTime?: number;
};

export const useGetRoomStatusQuery = (roomId: string, options?: QueryOptions) => {
  return useQuery<RoomDto>({
    queryKey: ['rooms', roomId],
    queryFn: () => directorClient.getRoomStatus(roomId),
    enabled: options?.enabled ?? Boolean(roomId),
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect,
    refetchOnMount: options?.refetchOnMount,
    staleTime: options?.staleTime
  });
};

export const useGetRoomMetaDataQuery = (roomId: string, options?: QueryOptions) => {
  return useQuery<RoomMetaDataDto>({
    queryKey: ['roomMetadata', roomId],
    queryFn: () => directorClient.getRoomMetaData(roomId),
    enabled: options?.enabled ?? Boolean(roomId),
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect,
    refetchOnMount: options?.refetchOnMount,
    staleTime: options?.staleTime
  });
};

//------------------------------------------------
// REFETCH QUERIES
//------------------------------------------------

export const useGetFriendPendingDataQuery = (viewerUsername: string, options?: QueryOptions) => {
  const normalizedViewerUsername = viewerUsername.trim();

  return useQuery<SocialUserDto[]>({
    queryKey: getViewerScopedFriendRequestsQueryKey(normalizedViewerUsername),
    queryFn: () => directorClient.listFriendRequests(),
    enabled: (options?.enabled ?? true) && Boolean(normalizedViewerUsername),
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect
  });
};

export const useGetFriendListDataQuery = (viewerUsername: string, options?: QueryOptions) => {
  const normalizedViewerUsername = viewerUsername.trim();

  return useQuery<SocialUserDto[]>({
    queryKey: getViewerScopedFriendsQueryKey(normalizedViewerUsername),
    queryFn: () => directorClient.listFriends(),
    enabled: (options?.enabled ?? true) && Boolean(normalizedViewerUsername),
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect
  });
};
