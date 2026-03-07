import { OpenAPI } from '@/gen/director/core/OpenAPI';
import { UsersService } from '@/gen/director/services/UsersService';
import type { CreateUserRequestBody } from '@/gen/director/models/CreateUserRequestBody';
import { type ConnectRoomRequest, type CreateRoomRequestBody, RoomsService } from '@/gen/director';

OpenAPI.BASE = import.meta.env.VITE_DIRECTOR_URL;

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
    async listRooms() {
        return RoomsService.getRooms();
    },
};