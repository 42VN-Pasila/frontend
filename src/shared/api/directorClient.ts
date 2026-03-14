import { OpenAPI } from '@/gen/director/core/OpenAPI';
import { UsersService } from '@/gen/director/services/UsersService';
import type { CreateUserRequestBody } from '@/gen/director/models/CreateUserRequestBody';
import { type AskCardEvent, type ConnectMatchEvent, type ConnectRoomRequest, type CreateRoomRequestBody, type DisConnectMatchEvent, ResourcesService, RoomsService, type StartMatchRequest, UpdateRoomUserStatusRequestBody, type UpdateUserAvatarRequestBody } from '@/gen/director';
import { toDevPath } from './path.dev';
import { Socket, io } from "socket.io-client";

export const socket: Socket = io(import.meta.env.VITE_DIRECTOR_URL, {
    transports: ["websocket"], // optional: prefer websocket
    autoConnect: false,        // we control when to connect
    withCredentials: true,     // if you use cookies
});

type SocketResponse = {
    ok: boolean;
    error: string;
};

// socket.connect();

export const socketJoinMatch = (payload: ConnectMatchEvent) => {
    socket.emit("match:join", payload, (res: SocketResponse) => {
        if (!res?.ok) {
            console.error("join failed", res?.error);
            return;
        }
        console.log("joined!");
    });
};

export const socketLeaveMatch = (payload: DisConnectMatchEvent) => {
    socket.emit("match:leave", payload, (res: SocketResponse) => {
        if (!res?.ok) {
            console.error("leave failed", res?.error);
            return;
        }
        console.log("left!");
    });
};

export const socketAskCardMatch = (payload: AskCardEvent) => {
    socket.emit("match:ask-card", payload, (res: SocketResponse) => {
        if (!res?.ok) {
            console.error("ask card failed", res?.error);
            return;
        }
        console.log("card asked!");
    });
};

export const socketAttachMatchDebugListeners = () => {
    socket.on("match:connected", (evt) => console.log("someone joined", evt));
    socket.on("match:ping", (evt) => console.log("ping received", evt));
};

OpenAPI.BASE = toDevPath(import.meta.env.VITE_DIRECTOR_URL ?? "");

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
};