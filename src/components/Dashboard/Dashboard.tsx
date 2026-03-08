import { useEffect } from "react";
import { useUserStore } from "@/shared/stores/useGameSessionStore";
import { FriendList } from "../FriendList/FriendList";
import { RoomList } from "../RoomList/RoomList";
import { UserProfile } from "./UserProfile";
import GameStats from "./GameStats";

const MOCK_USER = {
    userId: "123",
    username: "John Doe",
    imageUrl: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
};

export const Dashboard = () => {

    const { setUsername, setUserId, setImageUrl } = useUserStore();
    useEffect(() => {
        setUserId(MOCK_USER.userId);
        setUsername(MOCK_USER.username);
        setImageUrl(MOCK_USER.imageUrl);
    }, [setImageUrl, setUserId, setUsername]);

    return (
        <div className="min-h-screen bg-rave-black text-rave-white">
            <div className="mx-auto w-full max-w-[90vw] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                <div className="mb-6 flex flex-col gap-4  sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-widest">DASHBOARD</h1>
                        <p className="mt-1 text-rave-white/60">
                            Rooms overview & quick actions
                        </p>
                    </div>
                    <UserProfile className="self-start sm:self-auto" />
                </div>

                <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                    <div className="grid grid-cols-1 gap-4">
                        <GameStats />
                        <RoomList />
                    </div>
                    <div className="xl:sticky xl:top-6">
                        <FriendList />
                    </div>
                </div>
            </div>
        </div>
    );
};

