import { OpenAPI } from '@/gen/director/core/OpenAPI';
import { UsersService } from '@/gen/director/services/UsersService';
import type { CreateUserRequestBody } from '@/gen/director/models/CreateUserRequestBody';
import { type ConnectRoomRequest, type CreateRoomRequestBody, ResourcesService, RoomsService, type StartMatchRequest, type UpdateUserAvatarRequestBody } from '@/gen/director';
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

export const joinRoomSocket = (roomId: string, userId: string) => {
    socket.emit("room:join", { roomId, userId }, (res: SocketResponse) => {
        if (!res?.ok) {
            console.error("join failed", res?.error);
            return;
        }
        console.log("joined!");
    });
};

export const pingRoomSocket = (roomId: string, userId: string) => {
    socket.emit("room:ping", { roomId, userId }, (res: SocketResponse) => {
        if (!res?.ok) {
            console.error("ping failed", res?.error);
        }
    });
};

export const attachRoomSocketDebugListeners = () => {
    socket.on("room.connected", (evt) => console.log("someone joined", evt));
    socket.on("room.ping", (evt) => console.log("ping received", evt));
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
    // async startMatch(roomId: string, body: StartMatchRequest) {
    //     return RoomsService.startMatch({ roomId, requestBody: body });
    // },
    async listRooms() {
        return RoomsService.getRooms();
    },
    async listAvatars() {
        return ResourcesService.getResourcesAvatars();
    },
    async updateUserAvatar(userId: string, body: UpdateUserAvatarRequestBody) {
        return UsersService.updateUserAvatar({ userId, requestBody: body });
    },
};