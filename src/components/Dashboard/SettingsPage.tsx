import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useGetUserByUsernameQuery } from "@/shared/api/directorApi";
import { rudexClient } from "@/shared/api/rudexClient";
import NavBar from "@/shared/components/NavBar";
import { useUserStore } from "@/shared/stores/useUserStore";

import { AccountInfo } from "../Profile/AccountInfo";
import { AvatarSection } from "../Profile/AvatarSection";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const rawUsername = useUserStore((state) => state.username);
  const username = (rawUsername ?? "").trim();
  const { data: userData } = useGetUserByUsernameQuery(username, {
    enabled: Boolean(username),
  });
  const { data: profileData } = useQuery({
    queryKey: ["rudex", "profile", username],
    queryFn: () => rudexClient.getUserInfo(username),
    enabled: Boolean(username),
  });

  const accountInfo = {
    username: username,
    displayname: userData?.displayName?.trim() || username,
    email: profileData?.email || "",
  };

  const handleReturn = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-rave-black text-rave-white">
      <NavBar
        button={{
          onClick: handleReturn,
          children: "Back to Dashboard",
          className: "text-sm font-medium",
        }}
      />
      <div className="mx-auto w-full max-w-[72vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 xl:col-span-8">
            <AccountInfo {...accountInfo} />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:col-span-4 xl:sticky xl:top-6">
            <AvatarSection />
          </div>
        </div>
      </div>
    </div>
  );
};
