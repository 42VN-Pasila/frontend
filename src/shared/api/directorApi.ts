import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { directorClient } from "./directorClient";
import type { ConnectRoomResponse } from "@/gen/director/models/ConnectRoomResponse";
import type { CreateRoomResponse } from "@/gen/director/models/CreateRoomResponse";
import type { Avatar, ConnectRoomRequest, CreateRoomRequestBody, ErrorResponse, ListRoomsDto, RoomDto, StartMatchResponse, UpdateRoomUserStatusRequestBody, UpdateRoomUserStatusResponse, UpdateUserAvatarRequestBody, UpdateUserAvatarResponse } from "@/gen/director";



export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fakeBaseQuery<ErrorResponse>(),
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
        startMatch: builder.mutation<StartMatchResponse, { roomId: string; ownerId: string }>({
            async queryFn({ roomId, ownerId }) {
                const data = await directorClient.startMatch(roomId, { ownerId });
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
            invalidatesTags: ["Room"],
        }),
        getRoomStatus: builder.query<RoomDto, string>({
            async queryFn(roomId) {
                const data = await directorClient.getRoomStatus(roomId);
                return { data };
            },
        }),
        updateUserStatus: builder.mutation<UpdateRoomUserStatusResponse, { userId: string; roomId: string; status: "Ready" | "NotReady" }>({
            async queryFn({ userId, roomId, status }) {
                const bodyPayload: UpdateRoomUserStatusRequestBody = { status: status as UpdateRoomUserStatusRequestBody.status };
                const data = await directorClient.updateUserStatus(roomId, userId, bodyPayload);
                return { data };
            },
            invalidatesTags: ["Room"],
        }),
    }),
});

export const {
    useListRoomsQuery,
    useCreateRoomMutation,
    useConnectRoomMutation,
    useStartMatchMutation,
    useListAvatarsQuery,
    useUpdateUserAvatarMutation,
    useGetRoomStatusQuery,
    useUpdateUserStatusMutation,
} = directorApi;
