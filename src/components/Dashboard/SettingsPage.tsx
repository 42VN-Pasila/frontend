import { useNavigate } from "react-router-dom";

import NavBar from "@/shared/components/NavBar";

// import {
//   useListAvatarsQuery,
//   useUpdateUserAvatarMutation,
// } from "@/shared/api/directorApi";
// import { useUserStore } from "@/shared/stores/useUserStore";
import { AccountInfo } from "../Profile/AccountInfo";
import { AvatarSection } from "../Profile/AvatarSection";

const MOCK_USER = {
  username: "example-user",
  displayname: "Example User",
  email: "user@example.com",
};

export const SettingsPage = () => {
  const navigate = useNavigate();

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
            <AccountInfo {...MOCK_USER} />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:col-span-4 xl:sticky xl:top-6">
            <AvatarSection />
          </div>
        </div>
      </div>
    </div>
  );
};
