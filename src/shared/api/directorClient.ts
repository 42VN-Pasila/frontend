import { Socket, io } from 'socket.io-client';

import {
  type ExitMatchEvent,
  FriendsService,
  type JoinMatchEvent,
  type LeaveMatchEvent,
  type MatchDto,
  MatchMessageDto,
  type MatchResultDto,
  type RequestCardEvent,
  type RequestFriendRequestBody,
  ResourcesService,
  RespondToFriendRequestRequestBody,
  RoomsService,
  type SendMessageEvent,
  type SkipTurnEvent,
  SocialUserDto,
  type UpdateRoomUserStatusRequestBody,
  type UpdateUserAvatarRequestBody
} from '@/gen/director';
import { OpenAPI } from '@/gen/director/core/OpenAPI';
import { UsersService } from '@/gen/director/services/UsersService';

import { toDevPath } from './path.dev';

type SocketAck = {
  ok: boolean;
  error?: string;
};

type JoinMatchAck = { ok: true; match: MatchDto } | { ok: false; error: string };

type MatchPingEvent = {
  matchId: string;
  username: string;
};

const rawDirectorUrl = import.meta.env.VITE_DIRECTOR_URL as string | undefined;

const resolveDirectorBaseUrl = () => {
  const fallbackUrl = OpenAPI.BASE;
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
const resolveDirectorSocketOrigin = () => {
  try {
    return new URL(directorBaseUrl).origin;
  } catch {
    return window.location.origin;
  }
};
const directorSocketOrigin = resolveDirectorSocketOrigin();

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

export const socketExitMatch = (payload: ExitMatchEvent): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:exit', payload, (res: SocketAck) => {
      if (!res?.ok) {
        console.error('exit failed', res?.error);
        reject(new Error(res?.error || 'EXIT_FAILED'));
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

export const socketSkipTurn = (payload: SkipTurnEvent): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:skipTurn', payload, (res: SocketAck) => {
      if (!res?.ok) {
        console.error('skip turn failed', res?.error);
        reject(new Error(res?.error || 'SKIP_TURN_FAILED'));
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

export const socketSendMatchMessage = (payload: SendMessageEvent): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit('match:chat:sendMessage', payload, (res: SocketAck) => {
      if (!res?.ok) {
        console.error('send message failed', res?.error);
        reject(new Error(res?.error || 'SEND_MESSAGE_FAILED'));
        return;
      }

      resolve();
    });
  });
};

export const onMatchState = (handler: (match: MatchDto, matchResult?: MatchResultDto) => void) => {
  socket.on('match:state', handler);
  return () => socket.off('match:state', handler);
};

export const onSocketConnect = (handler: () => void) => {
  socket.on('connect', handler);
  return () => socket.off('connect', handler);
};

export const onSocketDisconnect = (handler: () => void) => {
  socket.on('disconnect', handler);
  return () => socket.off('disconnect', handler);
};

export const onLatestChatMessage = (handler: (message: MatchMessageDto) => void) => {
  socket.on('match:chat:latestMessage', handler);
  return () => socket.off('match:chat:latestMessage', handler);
};

OpenAPI.BASE = directorBaseUrl;
OpenAPI.WITH_CREDENTIALS = true;

export const directorClient = {
  async getUserByUsername(username: string) {
    return UsersService.getUserByUsername({ username });
  },
  async createRoom(body: { roomName: string }) {
    return RoomsService.postRooms({ requestBody: { roomName: body.roomName } });
  },
  async connectRoom(roomId: string) {
    return RoomsService.connectRoom({ roomId });
  },
  async startMatch(roomId: string) {
    return RoomsService.startMatch({ roomId });
  },
  async listRooms() {
    return RoomsService.getRooms();
  },
  async listAvatars() {
    return ResourcesService.getResourcesAvatars();
  },
  async updateUserAvatar(body: UpdateUserAvatarRequestBody) {
    return UsersService.updateUserAvatar({ requestBody: body });
  },
  async getRoomStatus(roomId: string) {
    return RoomsService.getRoomStatus({ roomId });
  },
  async updateUserStatus(roomId: string, body: UpdateRoomUserStatusRequestBody) {
    return RoomsService.updateRoomUserStatus({ roomId, requestBody: body });
  },
  async disconnectRoom(roomId: string) {
    return RoomsService.disconnectRoom({ roomId });
  },
  async getRoomMetaData(roomId: string) {
    return RoomsService.getRoomMetaData({ roomId });
  },
  async searchUsers(username: string): Promise<SocialUserDto[]> {
    return UsersService.searchByExactUserName({ username });
  },
  async sendFriendRequest(body: RequestFriendRequestBody) {
    return FriendsService.sendFriendRequest({ requestBody: body });
  },
  async listFriends(): Promise<SocialUserDto[]> {
    return FriendsService.getUserFriends();
  },
  async listFriendRequests(): Promise<SocialUserDto[]> {
    return FriendsService.getAllFriendRequests();
  },
  async respondFriendRequest(otherUsername: string, body: RespondToFriendRequestRequestBody) {
    return FriendsService.respondToFriendRequest({
      otherUsername,
      requestBody: body
    });
  },
  async removeFriendship(otherUsername: string): Promise<void> {
    return FriendsService.removeFriendship({ otherUsername });
  }
};
