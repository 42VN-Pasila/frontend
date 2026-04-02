import { useNavigate } from "react-router-dom";

import {
  useListAvatarsQuery,
  useUpdateUserAvatarMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";

import { AccountInfo } from "../Profile/AccountInfo";
import { AvatarSection } from "../Profile/AvatarSection";

export const MOCK_USER = {
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
      <div className="mx-auto w-full max-w-[90vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4  sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-widest">
              SETTINGS
            </h1>
            <p className="mt-1 mb-4 text-rave-white/60">
              User profile & editting
            </p>
            <Button
              variant="inverse"
              emphasis="low"
              size="small"
              onClick={handleReturn}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

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
