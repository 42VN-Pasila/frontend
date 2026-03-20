import { Socket, io } from 'socket.io-client';

import {
  type AddFriendRequestBody,
  type ConnectRoomRequest,
  type CreateRoomRequestBody,
  FriendsService,
  type JoinMatchEvent,
  type LeaveMatchEvent,
  type MatchDto,
  type RequestCardEvent,
  ResourcesService,
  type RespondAddFriendRequestBody,
  RoomsService,
  type SocialUserDto,
  type StartMatchRequest,
  type UpdateRoomUserStatusRequestBody,
  type UpdateUserAvatarRequestBody
} from '@/gen/director';
import { OpenAPI } from '@/gen/director/core/OpenAPI';
import type { CreateUserRequestBody } from '@/gen/director/models/CreateUserRequestBody';
import { UsersService } from '@/gen/director/services/UsersService';

import { toDevPath } from './path.dev';

type SocketAck = {
  ok: boolean;
  error?: string;
};

type JoinMatchAck = { ok: true; match: MatchDto } | { ok: false; error: string };

type MatchPingEvent = {
  matchId: string;
  userId: string;
};

const rawDirectorUrl = import.meta.env.VITE_DIRECTOR_URL as string | undefined;

const resolveDirectorBaseUrl = () => {
  const fallbackUrl = window.location.origin;
  const input = rawDirectorUrl?.trim();

  if (!input) {
    return fallbackUrl;
  }

  try {
    return toDevPath(input);
  } catch {
    if (import.meta.env.DEV) {
      console.warn(
        `Invalid VITE_DIRECTOR_URL "${input}". Falling back to "${fallbackUrl}" in dev.`
      );
      return fallbackUrl;
    }
    throw new Error(`Invalid VITE_DIRECTOR_URL: "${input}"`);
  }
};

const directorBaseUrl = resolveDirectorBaseUrl();
const directorSocketOrigin = new URL(directorBaseUrl).origin;

export const socket: Socket = io(directorSocketOrigin, {
  transports: ['websocket'],
  autoConnect: false,
  withCredentials: true
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const socketJoinMatch = (payload: JoinMatchEvent): Promise<{ match: MatchDto }> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:join', payload, (res: JoinMatchAck) => {
      if (!res?.ok) {
        console.error('join failed', res?.error);
        reject(new Error(res?.error || 'JOIN_FAILED'));
        return;
      }

      resolve({ match: res.match });
    });
  });
};

export const socketLeaveMatch = (payload: LeaveMatchEvent): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:leave', payload, (res: SocketAck) => {
      if (!res?.ok) {
        console.error('leave failed', res?.error);
        reject(new Error(res?.error || 'LEAVE_FAILED'));
        return;
      }

      resolve();
    });
  });
};

export const socketAskCardMatch = (payload: RequestCardEvent): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:requestCard', payload, (res: SocketAck) => {
      if (!res?.ok) {
        console.error('ask card failed', res?.error);
        reject(new Error(res?.error || 'REQUEST_CARD_FAILED'));
        return;
      }

      resolve();
    });
  });
};

export const socketPingMatch = (payload: MatchPingEvent): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:ping', payload, (res: SocketAck) => {
      if (!res?.ok) {
        console.error('ping failed', res?.error);
        reject(new Error(res?.error || 'PING_FAILED'));
        return;
      }

      resolve();
    });
  });
};

export const onMatchState = (handler: (match: MatchDto) => void) => {
  socket.on('match:state', handler);
  return () => socket.off('match:state', handler);
};

export const onSocketConnect = (handler: () => void) => {
  socket.on('connect', handler);
  return () => socket.off('connect', handler);
};

export const onSocketDisconnect = (handler: (reason: Socket.DisconnectReason) => void) => {
  socket.on('disconnect', handler);
  return () => socket.off('disconnect', handler);
};

OpenAPI.BASE = directorBaseUrl;

export const directorClient = {
  async createUser(body: CreateUserRequestBody) {
    return UsersService.postUsers({ requestBody: body });
  },
  async createRoom(body: CreateRoomRequestBody) {
    return RoomsService.postRooms({ requestBody: body });
  },
  async connectRoom(roomId: string, body: ConnectRoomRequest) {
    return RoomsService.connectRoom({ roomId, requestBody: body });
  },
  async startMatch(roomId: string, body: StartMatchRequest) {
    return RoomsService.startMatch({ roomId, requestBody: body });
  },
  async listRooms() {
    return RoomsService.getRooms();
  },
  async listAvatars() {
    return ResourcesService.getResourcesAvatars();
  },
  async updateUserAvatar(userId: string, body: UpdateUserAvatarRequestBody) {
    return UsersService.updateUserAvatar({ userId, requestBody: body });
  },
  async getRoomStatus(roomId: string) {
    return RoomsService.getRoomStatus({ roomId });
  },
  async updateUserStatus(roomId: string, userId: string, body: UpdateRoomUserStatusRequestBody) {
    return RoomsService.updateRoomUserStatus({ roomId, userId, requestBody: body });
  },
  async disconnectRoom(roomId: string, userId: string) {
    return RoomsService.disconnectRoom({ roomId, requestBody: { userId } });
  },
  async getRoomMetaData(roomId: string) {
    return RoomsService.getRoomMetaData({ roomId });
  },
  async searchUsers(query: string, requesterId: string) {
    return UsersService.getUsersSearch({ query, requesterId });
  },
  async sendFriendRequest(userId: string, body: AddFriendRequestBody) {
    return FriendsService.postUsersFriendRequests({ userId, requestBody: body });
  },
  async listFriends(userId: string): Promise<SocialUserDto[]> {
    return FriendsService.getUsersFriends({ userId });
  },
  async listFriendRequests(userId: string): Promise<SocialUserDto[]> {
    return FriendsService.getUsersFriendRequests({ userId });
  },
  async respondFriendRequest(
    userId: string,
    requesterId: string,
    body: RespondAddFriendRequestBody
  ) {
    return FriendsService.patchUsersFriendRequests({
      userId,
      requesterId,
      requestBody: body
    });
  }
};
