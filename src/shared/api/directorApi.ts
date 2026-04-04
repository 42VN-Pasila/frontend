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
  UserDto
} from '@/gen/director';
import type { ConnectRoomResponse } from '@/gen/director/models/ConnectRoomResponse';
import type { CreateRoomResponse } from '@/gen/director/models/CreateRoomResponse';

import { directorClient } from './directorClient';

//------------------------------------------------
// QUERIES
//------------------------------------------------

export const useGetUserByUsernameQuery = (username: string) => {
  return useQuery<UserDto>({
    queryKey: ['users', username],
    queryFn: () => directorClient.getUserByUsername(username)
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

export const useSearchUsersQuery = (query: string, options?: { enabled?: boolean }) => {
  const normalizedQuery = query.trim();
  return useQuery<SocialUserDto[]>({
    queryKey: ['users', 'search', normalizedQuery],
    queryFn: () => directorClient.searchUsers(normalizedQuery),
    enabled: options?.enabled ?? Boolean(normalizedQuery)
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

export const useSendFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { otherUsername: string }>({
    mutationFn: ({ otherUsername }) => {
      const bodyPayload: RequestFriendRequestBody = { otherUsername };
      return directorClient.sendFriendRequest(bodyPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'search'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'friends'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'friend-requests'] });
    }
  });
};

export const useRespondFriendRequestMutation = () => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['users', 'friend-requests'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'friends'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'search'] });
    }
  });
};

export const useRemoveFriendshipMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { otherUsername: string }>({
    mutationFn: ({ otherUsername }) => {
      return directorClient.removeFriendship(otherUsername);
    },
    onSuccess: async (_data, variables) => {
      const friendsQueryKey = ['users', 'friends'] as const;

      queryClient.setQueryData<SocialUserDto[]>(friendsQueryKey, (prev = []) =>
        prev.filter((friend) => friend.username !== variables.otherUsername)
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: friendsQueryKey }),
        queryClient.invalidateQueries({ queryKey: ['users', 'friend-requests'] }),
        queryClient.invalidateQueries({ queryKey: ['users', 'search'] }),
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

export const useGetFriendPendingDataQuery = (options?: QueryOptions) => {
  return useQuery<SocialUserDto[]>({
    queryKey: ['users', 'friend-requests'],
    queryFn: () => directorClient.listFriendRequests(),
    enabled: options?.enabled ?? true,
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect
  });
};

export const useGetFriendListDataQuery = (options?: QueryOptions) => {
  return useQuery<SocialUserDto[]>({
    queryKey: ['users', 'friends'],
    queryFn: () => directorClient.listFriends(),
    enabled: options?.enabled ?? true,
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect
  });
};
