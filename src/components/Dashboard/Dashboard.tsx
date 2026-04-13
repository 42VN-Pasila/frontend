import type { UserDto } from "@/gen/director";
import { useGetUserByUsernameQuery } from "@/shared/api/directorApi";
import { useUserStore } from "@/shared/stores/useUserStore";

import { FriendList } from "../Friend/FriendList";
import { FriendSearchAdd } from "../Friend/FriendSearchAdd";
import { RoomList } from "../RoomList/RoomList";
import { RoomModal } from "../RoomModal/RoomModal";

import GameStats from "./GameStats";
import { UserProfile } from "./UserProfile";

export const Dashboard = () => {
  const username = useUserStore((state) => state.username);
  const { data: userData } = useGetUserByUsernameQuery(username, {
    enabled: Boolean(username.trim()),
  });

  const currentUser: UserDto = userData ?? {
    username: username.trim(),
    displayName: username.trim(),
    status: "OFFLINE",
    avatarUrl: undefined,
  };

  if (userData) {
    useUserStore.getState().setAvatarUrl(userData.avatarUrl ?? "");
  }
  return (
    <div className="min-h-screen bg-rave-black text-rave-white">
      <div className="mx-auto w-full max-w-[90vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4  sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-widest">
              DASHBOARD
            </h1>
            <p className="mt-1 text-rave-white/60">
              Rooms overview & quick actions
            </p>
          </div>
          <UserProfile user={currentUser} className="self-start sm:self-auto" />
        </div>

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 xl:col-span-8">
            <GameStats />
            <RoomModal />
            <RoomList />
          </div>
          <div className="grid grid-cols-1 gap-4 xl:col-span-4 xl:sticky xl:top-6">
            <FriendSearchAdd />
            <FriendList />
          </div>
        </div>
      </div>
    </div>
  );
};
