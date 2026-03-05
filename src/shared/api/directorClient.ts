import { OpenAPI } from '@/gen/director/core/OpenAPI';
import { UsersService } from '@/gen/director/services/UsersService';
import type { CreateUserRequest } from '@/gen/director/models/CreateUserRequest';
import { type ConnectRoomRequest, type CreateRoomRequest, RoomsService } from '@/gen/director';

OpenAPI.BASE = import.meta.env.VITE_DIRECTOR_URL;

export const directorClient = {
    async createUser(body: CreateUserRequest) {
        return UsersService.postUsers({ requestBody: body });
    },
    async createRoom(body: CreateRoomRequest) {
        return RoomsService.postRooms({ requestBody: body });
    },
    async connectRoom(roomId: string, body: ConnectRoomRequest) {
        return RoomsService.connectRoom({ roomId, requestBody: body });
    },
};