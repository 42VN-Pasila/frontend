import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { directorClient } from "./directorClient";
import type { ErrorResponse } from "@/gen/director/models/ErrorResponse";
import type { ConnectRoomResponse } from "@/gen/director/models/ConnectRoomResponse";
import type { CreateRoomResponse } from "@/gen/director/models/CreateRoomResponse";
import type { Avatar, ConnectRoomRequest, CreateRoomRequestBody, RoomDto, UpdateUserAvatarRequestBody, UpdateUserAvatarResponse } from "@/gen/director";

export type DirectorApiError = {
    status: number | string;
    data: ErrorResponse;
};

const toErrorResponse = (raw: unknown, fallbackMessage: string, status: number | string): ErrorResponse => {
    if (raw && typeof raw === "object") {
        const maybe = raw as Partial<ErrorResponse>;
        const resolvedMessage = maybe.message?.trim() || fallbackMessage;
        return {
            type: maybe.type || "DIRECTOR_API_ERROR",
            message: resolvedMessage,
            info: {
                ...(maybe.info ?? {}),
                statusCode: typeof status === "number" ? status : undefined,
            },
        };
    }

    if (typeof raw === "string") {
        return {
            type: "DIRECTOR_API_ERROR",
            message: raw || fallbackMessage,
            info: {
                statusCode: typeof status === "number" ? status : undefined,
            },
        };
    }

    return {
        type: "DIRECTOR_API_ERROR",
        message: fallbackMessage,
        info: {
            statusCode: typeof status === "number" ? status : undefined,
        },
    };
};

const toDirectorApiError = (error: unknown, fallbackMessage: string): DirectorApiError => {
    const maybeApiError = error as { status?: number; body?: unknown; message?: string };
    const status = maybeApiError.status ?? "FETCH_ERROR";
    const rawData = maybeApiError.body ?? maybeApiError.message;
    return {
        status,
        data: toErrorResponse(rawData, fallbackMessage, status),
    };
};

export const directorApi = createApi({
    reducerPath: "directorApi",
    baseQuery: fakeBaseQuery<DirectorApiError>(),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        listRooms: builder.query<RoomDto[], void>({
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
                    console.error(error);
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
        listAvatars: builder.query<Avatar[], void>({
            async queryFn() {
                try {
                    const data = await directorClient.listAvatars();
                    return { data };
                } catch (error) {
                    return { error: toDirectorApiError(error, "Unable to fetch avatars") };
                }
            },
        }),
        updateUserAvatar: builder.mutation<UpdateUserAvatarResponse, { userId: string; avatarId: string }>({
            async queryFn({ userId, avatarId }) {
                try {
                    const bodyPayload: UpdateUserAvatarRequestBody = { avatarId };
                    const data = await directorClient.updateUserAvatar(userId, bodyPayload);
                    return { data };
                } catch (error) {
                    return { error: toDirectorApiError(error, "Unable to update user avatar") };
                }
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
