import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  Avatar,
  ConnectRoomRequest,
  CreateRoomRequestBody,
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
  UpdateUserAvatarResponse
} from '@/gen/director';
import type { ConnectRoomResponse } from '@/gen/director/models/ConnectRoomResponse';
import type { CreateRoomResponse } from '@/gen/director/models/CreateRoomResponse';

import { directorClient } from './directorClient';

//------------------------------------------------
// QUERIES
//------------------------------------------------
export const useListRoomsQuery = () => {
  return useQuery<ListRoomsDto[]>({
    queryKey: ['rooms'],
    queryFn: () => directorClient.listRooms()
  });
};

export const useListAvatarsQuery = () => {
  return useQuery<Avatar[]>({
    queryKey: ['avatars'],
    queryFn: () => directorClient.listAvatars()
  });
};

export const useSearchUsersQuery = (
  requesterId: string,
  query: string,
  options?: { enabled?: boolean }
) => {
  const normalizedQuery = query.trim();
  return useQuery<SocialUserDto[]>({
    queryKey: ['users', 'search', requesterId, normalizedQuery],
    queryFn: () => directorClient.searchUsers(normalizedQuery, requesterId),
    enabled: options?.enabled ?? Boolean(requesterId && normalizedQuery)
  });
};

export const useListFriendsQuery = (
  rudexUserId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<SocialUserDto[]>({
    queryKey: ['users', 'friends', rudexUserId],
    queryFn: () => directorClient.listFriends(rudexUserId),
    enabled: options?.enabled ?? Boolean(rudexUserId)
  });
};

export const useListFriendRequestsQuery = (
  userId: string,
  options?: { enabled?: boolean }
) => {
  return useQuery<SocialUserDto[]>({
    queryKey: ['users', 'friend-requests', userId],
    queryFn: () => directorClient.listFriendRequests(userId),
    enabled: options?.enabled ?? Boolean(userId)
  });
};

//------------------------------------------------
// MUTATIONS
//------------------------------------------------

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateRoomResponse, Error, { userId: string; roomName: string }>({
    mutationFn: async ({ userId, roomName }) => {
      const bodyPayload: CreateRoomRequestBody = { userId, roomName };
      return directorClient.createRoom(bodyPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useConnectRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ConnectRoomResponse, Error, { roomId: string; userId: string }>({
    mutationFn: async ({ roomId, userId }) => {
      const bodyPayload: ConnectRoomRequest = { userId };
      return directorClient.connectRoom(roomId, bodyPayload);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useStartMatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<StartMatchResponse, Error, { roomId: string; ownerId: string }>({
    mutationFn: ({ roomId, ownerId }) => {
      return directorClient.startMatch(roomId, { ownerId });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useUpdateUserAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateUserAvatarResponse, Error, { userId: string; avatarId: string }>({
    mutationFn: ({ userId, avatarId }) => {
      const bodyPayload: UpdateUserAvatarRequestBody = { avatarId };
      return directorClient.updateUserAvatar(userId, bodyPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useDisconnectRoomMutation = () => {
  return useMutation<void, Error, { roomId: string; userId: string }>({
    mutationFn: ({ roomId, userId }) => {
      return directorClient.disconnectRoom(roomId, userId);
    }
  });
};

export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateRoomUserStatusResponse,
    Error,
    { userId: string; roomId: string; status: 'Ready' | 'NotReady' }
  >({
    mutationFn: ({ userId, roomId, status }) => {
      const bodyPayload: UpdateRoomUserStatusRequestBody = {
        status: status as UpdateRoomUserStatusRequestBody.status
      };

      return directorClient.updateUserStatus(roomId, userId, bodyPayload);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['rooms', variables.roomId] });
    }
  });
};

export const useSendFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { userId: string; otherUserId: string }>({
    mutationFn: ({ userId, otherUserId }) => {
      const bodyPayload: RequestFriendRequestBody = { otherUserId };
      return directorClient.sendFriendRequest(userId, bodyPayload);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'search', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['users', 'friends', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['users', 'friend-requests', variables.userId] });
    }
  });
};

export const useRespondFriendRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    RespondToFriendRequestResponse,
    Error,
    {
      userId: string;
      otherUserId: string;
      action: 'Accepted' | 'Canceled';
      invalidateUserIds?: string[];
    }
  >({
    mutationFn: ({ userId, otherUserId, action }) => {
      const bodyPayload: RespondToFriendRequestRequestBody = {
        action: action as RespondToFriendRequestRequestBody.action
      };

      return directorClient.respondFriendRequest(userId, otherUserId, bodyPayload);
    },
    onSuccess: (_data, variables) => {
      const affectedUserIds = new Set<string>([
        variables.userId,
        ...(variables.invalidateUserIds ?? [])
      ]);

      affectedUserIds.forEach((id) => {
        queryClient.invalidateQueries({ queryKey: ['users', 'friend-requests', id] });
        queryClient.invalidateQueries({ queryKey: ['users', 'friends', id] });
        queryClient.invalidateQueries({ queryKey: ['users', 'search', id] });
      });
    }
  });
};

export const useRemoveFriendshipMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { userId: string; otherUserId: string }>({
    mutationFn: ({ userId, otherUserId }) => {
      return directorClient.removeFriendship(userId, otherUserId);
    },
    onSuccess: async (_data, variables) => {
      const friendsQueryKey = ['users', 'friends', variables.userId] as const;

      queryClient.setQueryData<SocialUserDto[]>(friendsQueryKey, (prev = []) =>
        prev.filter((friend) => friend.id !== variables.otherUserId)
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: friendsQueryKey }),
        queryClient.invalidateQueries({ queryKey: ['users', 'friend-requests', variables.userId] }),
        queryClient.invalidateQueries({ queryKey: ['users', 'search', variables.userId] }),
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
};

export const useGetRoomStatusQuery = (roomId: string, options?: QueryOptions) => {
  return useQuery<RoomDto>({
    queryKey: ['rooms', roomId],
    queryFn: () => directorClient.getRoomStatus(roomId),
    enabled: options?.enabled ?? Boolean(roomId),
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect
  });
};

export const useGetRoomMetaDataQuery = (roomId: string, options?: QueryOptions) => {
  return useQuery<RoomMetaDataDto>({
    queryKey: ['roomMetadata', roomId],
    queryFn: () => directorClient.getRoomMetaData(roomId),
    enabled: options?.enabled ?? Boolean(roomId),
    refetchInterval: options?.pollingInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
    refetchOnReconnect: options?.refetchOnReconnect
  });
};

