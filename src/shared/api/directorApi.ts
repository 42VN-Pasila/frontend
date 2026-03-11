import type { Room } from "@/gen/director/models/Room";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { directorClient } from "./directorClient";
import type { ConnectRoomResponse } from "@/gen/director/models/ConnectRoomResponse";
import type { CreateRoomResponse } from "@/gen/director/models/CreateRoomResponse";
import type { ConnectRoomRequest, CreateRoomRequestBody } from "@/gen/director";

export type DirectorApiError = {
    status: number | string;
    data: unknown;
};

const toDirectorApiError = (error: unknown, fallbackMessage: string): DirectorApiError => {
    const maybeApiError = error as { status?: number; body?: unknown; message?: string };
    return {
        status: maybeApiError.status ?? "FETCH_ERROR",
        data: maybeApiError.body ?? maybeApiError.message ?? fallbackMessage,
    };
};

export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fakeBaseQuery<DirectorApiError>(),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        listRooms: builder.query<Room[], void>({
            async queryFn() {
                try {
                    const data = await directorClient.listRooms();
                    return { data };
                } catch (error) {
                    return { error: toDirectorApiError(error, "Unable to fetch rooms") };
                }
            },
            providesTags: ["Room"],
        }),
        createRoom: builder.mutation<CreateRoomResponse, { userId: string; roomName: string }>({
            async queryFn({ userId, roomName }) {
                try {
                    const bodyPayload: CreateRoomRequestBody = { userId, roomName };
                    const data = await directorClient.createRoom(bodyPayload);
                    return { data };
                } catch (error) {
                    return { error: toDirectorApiError(error, "Unable to create room") };
                }
            },
            invalidatesTags: ["Room"],
        }),
        connectRoom: builder.mutation<
            ConnectRoomResponse,
            { roomId: string; userId: string }
        >({
            async queryFn({ roomId, userId }) {
                try {
                    const bodyPayload: ConnectRoomRequest = { userId };
                    const data = await directorClient.connectRoom(roomId, bodyPayload);
                    return { data };
                } catch (error) {
                    return { error: toDirectorApiError(error, "Unable to connect to room") };
                }
            },
            invalidatesTags: ["Room"],
        }),
    }),
});

export const {
    useListRoomsQuery,
    useCreateRoomMutation,
    useConnectRoomMutation,
} = directorApi;
