import { useNavigate } from "react-router-dom";

import {
  useListAvatarsQuery,
  useUpdateUserAvatarMutation,
} from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";

import { AccountInfo } from "../Profile/AccountInfo";
import { AvatarSection } from "../Profile/AvatarSection";

type UserProfilePage = {
  id: string;
  username: string;
  imageUrl: string;
  status: "ONLINE" | "IN_GAME" | "OFFLINE";
  email: string;
  password: string;
};

const MOCK_FRIENDS: UserProfilePage[] = [
  {
    id: "f-001",
    username: "Tan",
    imageUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d195197053fe1a71f4b_peep-98.png",
    status: "ONLINE",
    email: "example@.example.com",
    password: "examplepassword",
  },
  {
    id: "f-002",
    username: "Triet",
    imageUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d35550b761a3af880d9_peep-99.png",
    status: "IN_GAME",
    email: "example@.example.com",
    password: "examplepassword",
  },
  {
    id: "f-003",
    username: "Huong",
    imageUrl:
      "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
    status: "OFFLINE",
    email: "example@.example.com",
    password: "examplepassword",
  },
];

const STATUS_CLASSES: Record<UserProfilePage["status"], string> = {
  ONLINE: "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
  IN_GAME: "border-rave-red/50 bg-rave-red/20 text-rave-white",
  OFFLINE: "border-rave-white/20 bg-rave-white/10 text-rave-white/60",
};


export const SettingsPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-rave-black text-rave-white">
      <div className="mx-auto w-full max-w-[90vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4  sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-widest">
              SETTINGS
            </h1>
            <p className="mt-1 text-rave-white/60">User profile & editting</p>
          </div>
          <Button
            variant="inverse"
            emphasis="low"
            size="small"
            onClick={handleReturn}
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 xl:col-span-8">
            <AccountInfo />
          </div>
          <div className="grid grid-cols-1 gap-4 xl:col-span-4 xl:sticky xl:top-6">
            <AvatarSection />
          </div>
        </div>
      </div>
    </div>
  );
};
