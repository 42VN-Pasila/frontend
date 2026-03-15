import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { directorClient } from "./directorClient";

import type { ConnectRoomResponse } from "@/gen/director/models/ConnectRoomResponse";
import type { CreateRoomResponse } from "@/gen/director/models/CreateRoomResponse";
import type {
    Avatar,
    ConnectRoomRequest,
    CreateRoomRequestBody,
    ListRoomsDto,
    RoomDto,
    RoomMetaDataDto,
    StartMatchResponse,
    UpdateRoomUserStatusRequestBody,
    UpdateRoomUserStatusResponse,
    UpdateUserAvatarRequestBody,
    UpdateUserAvatarResponse,
} from "@/gen/director";

//------------------------------------------------
// QUERIES
//------------------------------------------------
export const useListRoomsQuery = () => {
    return useQuery<ListRoomsDto[]>({
        queryKey: ["rooms"],
        queryFn: () => directorClient.listRooms(),
    });
};

export const useListAvatarsQuery = () => {
    return useQuery<Avatar[]>({
        queryKey: ["avatars"],
        queryFn: () => directorClient.listAvatars(),
    });
};

//------------------------------------------------
// MUTATIONS
//------------------------------------------------

export const useCreateRoomMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        CreateRoomResponse,
        Error,
        { userId: string; roomName: string }
    >({
        mutationFn: async ({ userId, roomName }) => {
            const bodyPayload: CreateRoomRequestBody = { userId, roomName };
            return directorClient.createRoom(bodyPayload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
        },
    });
};

export const useConnectRoomMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        ConnectRoomResponse,
        Error,
        { roomId: string; userId: string }
    >({
        mutationFn: async ({ roomId, userId }) => {
            const bodyPayload: ConnectRoomRequest = { userId };
            return directorClient.connectRoom(roomId, bodyPayload);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            queryClient.invalidateQueries({ queryKey: ["rooms", variables.roomId] });
        },
    });
};

export const useStartMatchMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        StartMatchResponse,
        Error,
        { roomId: string; ownerId: string }
    >({
        mutationFn: ({ roomId, ownerId }) => {
            return directorClient.startMatch(roomId, { ownerId });
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            queryClient.invalidateQueries({ queryKey: ["rooms", variables.roomId] });
        },
    });
};

export const useUpdateUserAvatarMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        UpdateUserAvatarResponse,
        Error,
        { userId: string; avatarId: string }
    >({
        mutationFn: ({ userId, avatarId }) => {
            const bodyPayload: UpdateUserAvatarRequestBody = { avatarId };
            return directorClient.updateUserAvatar(userId, bodyPayload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
        },
    });
};

export const useDisconnectRoomMutation = () => {
    return useMutation<void, Error, { roomId: string; userId: string }>({
        mutationFn: ({ roomId, userId }) => {
            return directorClient.disconnectRoom(roomId, userId);
        },
    });
};

export const useUpdateUserStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        UpdateRoomUserStatusResponse,
        Error,
        { userId: string; roomId: string; status: "Ready" | "NotReady" }
    >({
        mutationFn: ({ userId, roomId, status }) => {
            const bodyPayload: UpdateRoomUserStatusRequestBody = {
                status: status as UpdateRoomUserStatusRequestBody.status,
            };

            return directorClient.updateUserStatus(roomId, userId, bodyPayload);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            queryClient.invalidateQueries({ queryKey: ["rooms", variables.roomId] });
        },
    });
};

//------------------------------------------------
// POLLING QUERIES
//------------------------------------------------

type QueryOptions = {
    enabled?: boolean;
    pollingInterval?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
};

export const useGetRoomStatusQuery = (
    roomId: string,
    options?: QueryOptions,
) => {
    return useQuery<RoomDto>({
        queryKey: ["rooms", roomId],
        queryFn: () => directorClient.getRoomStatus(roomId),
        enabled: options?.enabled ?? Boolean(roomId),
        refetchInterval: options?.pollingInterval,
        refetchOnWindowFocus: options?.refetchOnWindowFocus,
        refetchOnReconnect: options?.refetchOnReconnect,
    });
};

export const useGetRoomMetaDataQuery = (
    roomId: string,
    options?: QueryOptions,
) => {
    return useQuery<RoomMetaDataDto>({
        queryKey: ["roomMetadata", roomId],
        queryFn: () => directorClient.getRoomMetaData(roomId),
        enabled: options?.enabled ?? Boolean(roomId),
        refetchInterval: options?.pollingInterval,
        refetchOnWindowFocus: options?.refetchOnWindowFocus,
        refetchOnReconnect: options?.refetchOnReconnect,
    });
};