import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { queryClient } from "@/shared/api/queryClient";
import { useAuth } from "@/shared/auth/useAuth";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useRoomStore } from "@/shared/stores/useRoomStore";
import { useGetUserByUsernameQuery } from "@/shared/api/directorApi";
import { useUserStore } from "@/shared/stores/useUserStore";

import { FriendList } from "../Friend/FriendList";
import { FriendSearchAdd } from "../Friend/FriendSearchAdd";
import { RoomList } from "../RoomList/RoomList";
import { RoomModal } from "../RoomModal/RoomModal";

import GameStats from "./GameStats";
import { UserProfile } from "./UserProfile";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const resetUser = useUserStore((state) => state.resetUser);
  const resetRoom = useRoomStore((state) => state.resetRoom);
  const resetGameSession = useGameSessionStore((state) => state.resetGameSession);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: userData } = useGetUserByUsernameQuery(
    useUserStore.getState().username,
  );

  if (userData) {
    useUserStore.getState().setAvatarUrl(userData.avatarUrl ?? "");
  }

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      resetGameSession();
      resetRoom();
      resetUser();
      queryClient.clear();
      navigate("/login", { replace: true });
      setIsLoggingOut(false);
    }
  };

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
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <UserProfile />
            <button
              type="button"
              onClick={() => {
                void handleLogout();
              }}
              disabled={isLoggingOut}
              className="inline-flex h-12 items-center justify-center border border-rave-red/70 px-4 text-sm font-chakraBold uppercase tracking-wider text-rave-white transition-colors hover:bg-rave-red/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
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
