import { useEffect } from "react";
import { useGameSessionStore, useUserStore } from "@/shared/stores/useGameSessionStore";
import { FriendList } from "../FriendList/FriendList";
import { RoomList } from "../RoomList/RoomList";
import { UserProfile } from "./UserProfile";
import GameStats from "./GameStats";
import { DevUserModal } from "../DevUserModal/DevUserModal";
import { RoomModal } from "../RoomModal/RoomModal";

const MOCK_USER = {
    username: "John Doe",
    imageUrl: "https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535cfb4600807d898fc75b_peep-97.png",
};

const MOCK_OPPONENTS = [
    { id: "opponent-1", username: "Huong", avatarUrl: 'https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5359f2d39923046255369c_peep-71.png', cardCount: 7 },
    { id: "opponent-2", username: "Tan", avatarUrl: 'https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d195197053fe1a71f4b_peep-98.png', cardCount: 9 },
    { id: "opponent-3", username: "Triet", avatarUrl: 'https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e535d35550b761a3af880d9_peep-99.png', cardCount: 11 },
];

export const Dashboard = () => {
    const { setOpponents, setOpponentIds, setTurnOrder } = useGameSessionStore();
    const { setUsername, setImageUrl } = useUserStore();
    useEffect(() => {
        setUsername(MOCK_USER.username);
        setImageUrl(MOCK_USER.imageUrl);
        setOpponents(MOCK_OPPONENTS);
        setOpponentIds(MOCK_OPPONENTS.map((opponent) => opponent.id));
        setTurnOrder(["player-local", ...MOCK_OPPONENTS.map((opponent) => opponent.id)]);
    }, [setImageUrl, setUsername, setOpponents, setOpponentIds, setTurnOrder]);

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

                <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
                    <div className="grid grid-cols-1 gap-4 xl:col-span-8">
                        <GameStats />
                        <RoomModal />
                        <RoomList />
                    </div>
                    <div className="grid grid-cols-1 gap-4 xl:col-span-4 xl:sticky xl:top-6">
                        <DevUserModal />
                        <FriendList />
                    </div>
                </div>
            </div>
        </div>
    );
};

