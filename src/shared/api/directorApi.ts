import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { directorClient } from "./directorClient";

import type { ConnectRoomResponse } from "@/gen/director/models/ConnectRoomResponse";
import type { CreateRoomResponse } from "@/gen/director/models/CreateRoomResponse";
import type {
    Avatar,
    ListRoomsDto,
    RoomDto,
    RoomMetaDataDto,
    StartMatchResponse,
    UpdateRoomUserStatusRequestBody,
    UpdateRoomUserStatusResponse,
    UpdateUserAvatarRequestBody,
    UpdateUserAvatarResponse,
    UserDto,
} from "@/gen/director";

//------------------------------------------------
// QUERIES
//------------------------------------------------

export const useGetUserByUsernameQuery = (username: string) => {
    return useQuery<UserDto>({
        queryKey: ["users", username],
        queryFn: () => directorClient.getUserByUsername(username),
    });
};

export const useListRoomsQuery = () => {
    return useQuery<ListRoomsDto[]>({
        queryKey: ["rooms"],
        queryFn: () => directorClient.listRooms(),
        refetchInterval: 3_000,
        refetchOnWindowFocus: true,
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
        { roomName: string }
    >({
        mutationFn: async ({ roomName }) => {
            const bodyPayload: { roomName: string } = { roomName };
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
        { roomId: string }
    >({
        mutationFn: async ({ roomId }) => {
            return directorClient.connectRoom(roomId);
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
        { roomId: string }
    >({
        mutationFn: ({ roomId }) => {
            return directorClient.startMatch(roomId);
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
        { avatarId: string }
    >({
        mutationFn: ({ avatarId }) => {
            const bodyPayload: UpdateUserAvatarRequestBody = { avatarId };
            return directorClient.updateUserAvatar(bodyPayload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
        },
    });
};

export const useDisconnectRoomMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { roomId: string }>({
        mutationFn: ({ roomId }) => {
            return directorClient.disconnectRoom(roomId);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["rooms"] });
            queryClient.invalidateQueries({ queryKey: ["rooms", variables.roomId] });
        },
    });
};

export const useUpdateUserStatusMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        UpdateRoomUserStatusResponse,
        Error,
        { roomId: string; status: "Ready" | "NotReady" }
    >({
        mutationFn: ({ roomId, status }) => {
            const bodyPayload: UpdateRoomUserStatusRequestBody = {
                status: status as UpdateRoomUserStatusRequestBody.status,
            };

            return directorClient.updateUserStatus(roomId, bodyPayload);
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
    refetchOnMount?: boolean | "always";
    staleTime?: number;
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
        refetchOnMount: options?.refetchOnMount,
        staleTime: options?.staleTime,
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
        refetchOnMount: options?.refetchOnMount,
        staleTime: options?.staleTime,
    });
};