import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { directorClient } from "./directorClient";
import type { ConnectRoomResponse } from "@/gen/director/models/ConnectRoomResponse";
import type { CreateRoomResponse } from "@/gen/director/models/CreateRoomResponse";
import type { Avatar, ConnectRoomRequest, CreateRoomRequestBody, ListRoomsDto, UpdateUserAvatarRequestBody, UpdateUserAvatarResponse } from "@/gen/director";



export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        listRooms: builder.query<ListRoomsDto[], void>({
            async queryFn() {
                const data = await directorClient.listRooms();
                return { data };
            },
            providesTags: ["Room"],
        }),
        createRoom: builder.mutation<CreateRoomResponse, { userId: string; roomName: string }>({
            async queryFn({ userId, roomName }) {
                const bodyPayload: CreateRoomRequestBody = { userId, roomName };
                const data = await directorClient.createRoom(bodyPayload);
                return { data };

            },
            invalidatesTags: ["Room"],
        }),
        connectRoom: builder.mutation<
            ConnectRoomResponse,
            { roomId: string; userId: string }
        >({
            async queryFn({ roomId, userId }) {
                const bodyPayload: ConnectRoomRequest = { userId };
                const data = await directorClient.connectRoom(roomId, bodyPayload);
                return { data };
            },
            invalidatesTags: ["Room"],
        }),
        listAvatars: builder.query<Avatar[], void>({
            async queryFn() {
                const data = await directorClient.listAvatars();
                return { data };

            },
        }),
        updateUserAvatar: builder.mutation<UpdateUserAvatarResponse, { userId: string; avatarId: string }>({
            async queryFn({ userId, avatarId }) {
                const bodyPayload: UpdateUserAvatarRequestBody = { avatarId };
                const data = await directorClient.updateUserAvatar(userId, bodyPayload);
                return { data };

            },
        }),
    }),
});

export const {
    useListRoomsQuery,
    useCreateRoomMutation,
    useConnectRoomMutation,
    useListAvatarsQuery,
    useUpdateUserAvatarMutation,
} = directorApi;
